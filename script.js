// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Água Mineral 500ml",
        preco: 2.50,
        descricao: "Água mineral natural, pura e cristalina.",
        imagem: "images/agua-500ml.jpg",
        categoria: "Água Mineral",
        destaque: true
    },
    {
        id: 2,
        nome: "Água Mineral 1L",
        preco: 3.50,
        descricao: "Água mineral natural em garrafa de 1 litro.",
        imagem: "images/agua-1l.jpg",
        categoria: "Água Mineral",
        destaque: true
    },
    {
        id: 3,
        nome: "Água Gelada 500ml",
        preco: 3.00,
        descricao: "Água mineral gelada, perfeita para dias quentes.",
        imagem: "images/agua-gelada-500ml.jpg",
        categoria: "Gelada",
        destaque: true
    },
    {
        id: 4,
        nome: "Galão 20L",
        preco: 10.00,
        descricao: "Galão de água mineral 20 litros com tampinha.",
        imagem: "images/galao-20l.jpg",
        categoria: "Galão",
        destaque: true
    }
];

// Variáveis globais
let cart = [];
let cupomAplicado = null;
let deliveryFee = 0;

// Cupons válidos
const cuponsValidos = {
    "MJAGUA10": { desconto: 10, tipo: "percentual" },
    "FRETEGRATIS": { desconto: 0, tipo: "fretegratis" }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateStatus();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Exibir a capa inicialmente
    document.getElementById('header').style.display = 'block';
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
});

function updateStatus() {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    if (horaAtual >= 8 && horaAtual < 18) {
        statusText.textContent = 'Aberto';
        statusDot.style.backgroundColor = 'green';
    } else {
        statusText.textContent = 'Fechado';
        statusDot.style.backgroundColor = 'red';
    }
}

// ========== FUNÇÕES DO CATÁLOGO ========== //
function showInicio() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'flex';
    loadDestaqueProducts();
}

function loadDestaqueProducts() {
    const container = document.getElementById('produtos-destaque');
    container.innerHTML = '';
    
    produtos.forEach(produto => {
        if (produto.destaque) {
            container.appendChild(createProductCard(produto));
        }
    });
}

function filterProducts(categoria) {
    const container = document.getElementById('produtos-destaque');
    container.innerHTML = '<h2>' + categoria + '</h2>';
    
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    
    if (produtosFiltrados.length === 0) {
        container.innerHTML += '<p>Nenhum produto encontrado nesta categoria.</p>';
        return;
    }
    
    produtosFiltrados.forEach(produto => {
        container.appendChild(createProductCard(produto));
    });
}

function createProductCard(produto) {
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto');
    produtoDiv.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="produto-content">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <span class="produto-price">R$ ${produto.preco.toFixed(2)}</span>
            <button onclick="adicionarAoCarrinho(${produto.id})">
                <i class="fas fa-cart-plus"></i> Pedir Agora
            </button>
        </div>
    `;
    return produtoDiv;
}

// ========== FUNÇÕES DO CARRINHO ========== //
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = cart.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        cart.push({
            ...produto,
            quantidade: 1
        });
    }
    
    updateCartPage();
    showCoolNotification(`✔️ ${produto.nome} adicionado`);
}

function showCartPage() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
    updateCartPage();
}

function backToCatalog() {
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('mainFooter').style.display = 'flex';
}

function updateCartPage() {
    const container = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    container.innerHTML = '';
    let subtotal = 0;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        cartSubtotal.textContent = 'R$ 0.00';
        cartTotalPrice.textContent = 'R$ 0.00';
        updateCartIcon();
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        subtotal += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.nome}</div>
                <div class="item-price">R$ ${item.preco.toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantidade + 1})">+</button>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        container.appendChild(itemDiv);
    });
    
    // Aplicar desconto do cupom
    let total = subtotal;
    if (cupomAplicado && cuponsValidos[cupomAplicado].tipo === "percentual") {
        total *= (1 - cuponsValidos[cupomAplicado].desconto / 100);
    }
    
    // Atualizar totais
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
    
    // Atualizar cupom
    updateCouponDisplay();
    
    // Atualizar contador do ícone do carrinho
    updateCartIcon();
}

function updateCouponDisplay() {
    const couponApplied = document.getElementById('couponApplied');
    const appliedCouponText = document.getElementById('appliedCouponText');
    
    if (cupomAplicado) {
        couponApplied.style.display = 'flex';
        appliedCouponText.textContent = `Cupom: ${cupomAplicado}`;
        
        if (cuponsValidos[cupomAplicado].tipo === "percentual") {
            appliedCouponText.textContent += ` (${cuponsValidos[cupomAplicado].desconto}% de desconto)`;
        } else if (cuponsValidos[cupomAplicado].tipo === "fretegratis") {
            appliedCouponText.textContent += ` (Frete Grátis)`;
        }
    } else {
        couponApplied.style.display = 'none';
    }
}

function updateCartIcon() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantidade, 0);
}

function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantidade = newQuantity;
        updateCartPage();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartPage();
}

function aplicarCupom() {
    const cupomInput = document.getElementById('couponCode').value.trim();
    const cupomContainer = document.getElementById('couponApplied');
    const cupomText = document.getElementById('appliedCouponText');
    
    if (cuponsValidos[cupomInput]) {
        cupomAplicado = cupomInput;
        cupomText.textContent = `Cupom: ${cupomInput}`;
        showCoolNotification(`🎉 Cupom aplicado!`);
        updateCartPage();
    } else {
        showCoolNotification("❌ Cupom inválido");
    }
}

function removerCupom() {
    cupomAplicado = null;
    document.getElementById('couponCode').value = '';
    updateCartPage();
}

// ========== FUNÇÕES DE CHECKOUT ========== //
function proceedToCheckout() {
    if (cart.length === 0) {
        showCoolNotification("❌ Seu carrinho está vazio");
        return;
    }
    
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('checkoutPage').style.display = 'block';
    
    // Iniciar checkout no passo 1
    document.getElementById('infoSection').style.display = 'block';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('confirmSection').style.display = 'none';
    document.getElementById('step1').classList.add('active');
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.remove('active');
}

function backToCart() {
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'block';
}

function selectDeliveryOption(option) {
    const addressSection = document.getElementById('addressSection');
    
    if (option === 'delivery') {
        document.getElementById('checkoutDelivery').checked = true;
        addressSection.style.display = 'block';
    } else {
        document.getElementById('checkoutPickup').checked = true;
        addressSection.style.display = 'none';
    }
}

function selectPaymentMethod(method) {
    const cashChangeSection = document.getElementById('cashChangeSection');
    
    document.getElementById(`payment${method.charAt(0).toUpperCase() + method.slice(1)}`).checked = true;
    
    if (method === 'cash') {
        cashChangeSection.style.display = 'block';
    } else {
        cashChangeSection.style.display = 'none';
    }
}

function selectChangeOption(option) {
    const cashAmountGroup = document.getElementById('cashAmountGroup');
    
    if (option === 'yes') {
        document.getElementById('changeYes').checked = true;
        cashAmountGroup.style.display = 'block';
    } else {
        document.getElementById('changeNo').checked = true;
        cashAmountGroup.style.display = 'none';
        document.getElementById('cashAmount').value = '';
    }
}

function nextStep(step) {
    // Validação antes de avançar
    if (step === 'payment') {
        const name = document.getElementById('checkoutName').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
        
        if (!name || !phone || !deliveryMethod) {
            showCoolNotification("❌ Preencha todas as informações obrigatórias");
            return;
        }
        
        if (deliveryMethod.value === 'delivery') {
            const address = document.getElementById('checkoutAddress').value.trim();
            if (!address) {
                showCoolNotification("❌ Informe o endereço de entrega");
                return;
            }
        }
    } else if (step === 'confirm') {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            showCoolNotification("❌ Selecione um método de pagamento");
            return;
        }
        
        if (paymentMethod.value === 'cash') {
            const changeOption = document.querySelector('input[name="changeOption"]:checked');
            if (!changeOption) {
                showCoolNotification("❌ Selecione se precisa de troco");
                return;
            }
            
            if (changeOption.value === 'yes') {
                const cashAmount = document.getElementById('cashAmount').value.trim();
                if (!cashAmount) {
                    showCoolNotification("❌ Informe o valor em dinheiro");
                    return;
                }
            }
        }
    }
    
    // Atualizar UI
    document.getElementById('infoSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('confirmSection').style.display = 'none';
    
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.remove('active');
    
    if (step === 'payment') {
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('step2').classList.add('active');
    } else if (step === 'confirm') {
        document.getElementById('confirmSection').style.display = 'block';
        document.getElementById('step3').classList.add('active');
        updateOrderReview();
    }
}

function prevStep(step) {
    document.getElementById('infoSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('confirmSection').style.display = 'none';
    
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.remove('active');
    
    if (step === 'info') {
        document.getElementById('infoSection').style.display = 'block';
        document.getElementById('step1').classList.add('active');
    } else if (step === 'payment') {
        document.getElementById('paymentSection').style.display = 'block';
        document.getElementById('step2').classList.add('active');
    }
}

function updateOrderReview() {
    // Informações do cliente
    document.getElementById('reviewName').textContent = `Nome: ${document.getElementById('checkoutName').value}`;
    document.getElementById('reviewPhone').textContent = `Telefone: ${document.getElementById('checkoutPhone').value}`;
    
    // Método de entrega
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
    if (deliveryMethod.value === 'delivery') {
        document.getElementById('reviewMethod').textContent = 'Entrega em Casa';
        document.getElementById('reviewAddress').textContent = `Endereço: ${document.getElementById('checkoutAddress').value}`;
        document.getElementById('reviewNotes').textContent = document.getElementById('checkoutNotes').value ? 
            `Observações: ${document.getElementById('checkoutNotes').value}` : '';
    } else {
        document.getElementById('reviewMethod').textContent = 'Retirar no Local';
        document.getElementById('reviewAddress').textContent = '';
        document.getElementById('reviewNotes').textContent = '';
    }
    
    // Método de pagamento
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    document.getElementById('reviewPayment').textContent = `Pagamento: ${paymentMethod.value === 'pix' ? 'Pix' : 
        paymentMethod.value === 'card' ? 'Cartão' : 'Dinheiro'}`;
    
    if (paymentMethod.value === 'cash') {
        const changeOption = document.querySelector('input[name="changeOption"]:checked');
        if (changeOption.value === 'yes') {
            document.getElementById('reviewChange').textContent = `Troco para: R$ ${document.getElementById('cashAmount').value}`;
        } else {
            document.getElementById('reviewChange').textContent = 'Não precisa de troco';
        }
    } else {
        document.getElementById('reviewChange').textContent = '';
    }
    
    // Itens do pedido
    const reviewItems = document.getElementById('reviewItems');
    reviewItems.innerHTML = '';
    
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        subtotal += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('review-item');
        itemDiv.innerHTML = `
            <span>${item.nome} (${item.quantidade}x)</span>
            <span>R$ ${itemTotal.toFixed(2)}</span>
        `;
        reviewItems.appendChild(itemDiv);
    });
    
    // Total
    let total = subtotal;
    if (cupomAplicado && cuponsValidos[cupomAplicado].tipo === "percentual") {
        total *= (1 - cuponsValidos[cupomAplicado].desconto / 100);
    }
    
    document.getElementById('reviewTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function confirmOrder() {
    // Montar mensagem para WhatsApp
    const name = document.getElementById('checkoutName').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const address = deliveryMethod === 'delivery' ? document.getElementById('checkoutAddress').value.trim() : '';
    const notes = document.getElementById('checkoutNotes').value.trim();
    
    let paymentDetails = paymentMethod === 'pix' ? 'Pix' : 
                       paymentMethod === 'card' ? 'Cartão' : 'Dinheiro';
    
    if (paymentMethod === 'cash') {
        const changeOption = document.querySelector('input[name="changeOption"]:checked').value;
        if (changeOption === 'yes') {
            const cashAmount = document.getElementById('cashAmount').value;
            paymentDetails += ` (Troco para R$ ${cashAmount})`;
        } else {
            paymentDetails += " (Não precisa de troco)";
        }
    }
    
    // Calcular total
    let subtotal = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    let total = subtotal;
    
    // Aplicar desconto do cupom
    if (cupomAplicado && cuponsValidos[cupomAplicado].tipo === "percentual") {
        total *= (1 - cuponsValidos[cupomAplicado].desconto / 100);
    }
    
    // Montar mensagem para WhatsApp com quebras de linha
    let message = `*Pedido MJ Águas*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Telefone:* ${phone}\n\n`;
    
    message += `*Itens do pedido:*\n`;
    cart.forEach(item => {
        message += `- ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    
    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    
    if (cupomAplicado) {
        message += `*Cupom aplicado:* ${cupomAplicado}\n`;
        if (cuponsValidos[cupomAplicado].tipo === "percentual") {
            message += `*Desconto:* ${cuponsValidos[cupomAplicado].desconto}%\n`;
        }
    }
    
    message += `*Taxa de entrega:* Grátis!\n`;
    message += `*Total:* R$ ${total.toFixed(2)}\n\n`;
    
    message += `*Forma de entrega:* ${deliveryMethod === 'delivery' ? 'Entrega em Casa' : 'Retirar no Local'}\n`;
    if (deliveryMethod === 'delivery') {
        message += `*Endereço:* ${address}\n`;
    }
    message += `*Forma de pagamento:* ${paymentDetails}\n\n`;
    
    if (notes) {
        message += `*Observações:*\n${notes}\n\n`;
    }
    
    message += `Aguardando confirmação!\nObrigado por escolher MJ Águas!`;
    
    // Enviar para WhatsApp
    const phoneNumber = "5511965201725";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Mostrar confirmação
    document.getElementById('checkoutPage').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'block';
    
    // Resetar carrinho
    cart = [];
    cupomAplicado = null;
    updateCartIcon();
}

// ========== NOTIFICAÇÕES ========== //
function showCoolNotification(message) {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        text: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true
    });
}
