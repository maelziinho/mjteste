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
    document.getElementById('cartIcon').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
    
    // Criar bolhas dinamicamente
    createBubbles();
});

function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubblesContainer.appendChild(bubble);
    }
}

// ========== FUNÇÕES DA CAPA ========== //
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
    document.getElementById('cartIcon').style.display = 'flex';
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
    
    updateCart();
    showCoolNotification(`✔️ ${produto.nome} adicionado`);
}

function toggleCart() {
    const cartDetails = document.getElementById('cartDetails');
    cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
    if (cartDetails.style.display === 'block') {
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        subtotal += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.nome} (${item.quantidade}x)</p>
            <div class="adjust-buttons">
                <span onclick="updateQuantity(${item.id}, ${item.quantidade - 1})">-</span>
                <span>${item.quantidade}</span>
                <span onclick="updateQuantity(${item.id}, ${item.quantidade + 1})">+</span>
            </div>
            <span class="remove-item" onclick="removeFromCart(${item.id})">🗑️</span>
        `;
        cartItems.appendChild(itemDiv);
    });
    
    // Aplicar desconto do cupom
    let total = subtotal;
    if (cupomAplicado && cuponsValidos[cupomAplicado].tipo === "percentual") {
        total *= (1 - cuponsValidos[cupomAplicado].desconto / 100);
    }
    
    // Sem taxa de entrega
    deliveryFee = 0;
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)} (Taxa de entrega: Grátis!)`;
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
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    if (cart.length === 0) {
        document.getElementById('cartDetails').style.display = 'none';
    }
}

// ========== FUNÇÕES DE CUPOM ========== //
function toggleCupomInput() {
    const container = document.getElementById('cupomInputContainer');
    const toggleButton = document.getElementById('toggleCupomButton');
    const arrow = toggleButton.querySelector('.arrow');
    
    if (container.style.display === 'none' || !container.style.display) {
        container.style.display = 'flex';
        arrow.classList.add('rotate');
    } else {
        container.style.display = 'none';
        arrow.classList.remove('rotate');
    }
}

function aplicarCupom() {
    const cupomInput = document.getElementById('cupomInput').value.trim();
    const cupomContainer = document.getElementById('cupomAplicadoContainer');
    const cupomText = document.getElementById('cupomAplicadoText');
    
    if (cuponsValidos[cupomInput]) {
        cupomAplicado = cupomInput;
        cupomText.textContent = `Cupom: ${cupomInput}`;
        document.getElementById('cupomInputContainer').style.display = 'none';
        document.getElementById('toggleCupomButton').style.display = 'none';
        cupomContainer.style.display = 'flex';
        showCoolNotification(`🎉 Cupom aplicado!`);
        updateCart();
    } else {
        showCoolNotification("❌ Cupom inválido");
    }
}

function removerCupom() {
    cupomAplicado = null;
    document.getElementById('cupomInput').value = '';
    document.getElementById('cupomAplicadoContainer').style.display = 'none';
    document.getElementById('toggleCupomButton').style.display = 'block';
    document.getElementById('cupomInputContainer').style.display = 'none';
    document.querySelector('.arrow').classList.remove('rotate');
    updateCart();
}

// ========== FUNÇÕES DE ENTREGA E PAGAMENTO ========== //
function handleDeliveryOptionChange(option) {
    const locationOption = document.getElementById('locationOption');
    if (option === "Receber em casa") {
        locationOption.style.display = 'block';
    } else {
        locationOption.style.display = 'none';
    }
    updateCart();
}

function toggleCashValueInput(show) {
    const cashValueContainer = document.getElementById('cashValueContainer');
    cashValueContainer.style.display = show ? 'block' : 'none';
    if (!show) {
        document.getElementById('cashValue').value = '';
    }
}

function showCashOption() {
    document.getElementById('cashOption').style.display = 'block';
    document.getElementById('cashValueContainer').style.display = 'none';
    document.getElementById('cashValue').value = '';
    // Desmarcar opções de troco
    document.getElementById('needChangeYes').checked = false;
    document.getElementById('needChangeNo').checked = false;
}

function checkPaymentOption() {
    document.getElementById('cashOption').style.display = 'none';
}

// ========== VALIDAÇÃO E FINALIZAÇÃO ========== //
function validateField(value, fieldName) {
    if (!value || value.trim() === "") {
        showCoolNotification(`❌ Por favor, preencha ${fieldName}`);
        return false;
    }
    return true;
}

function finalizeOrder() {
    // Validações
    const nameInput = document.getElementById('nameInput');
    if (!validateField(nameInput.value, "seu nome")) return;
    
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked');
    if (!deliveryOption) {
        showCoolNotification("❌ Selecione a opção de entrega");
        return;
    }
    
    if (deliveryOption.value === "Receber em casa") {
        const addressInput = document.getElementById('addressInput');
        if (!validateField(addressInput.value, "seu endereço")) return;
    }
    
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked');
    if (!paymentOption) {
        showCoolNotification("❌ Selecione a forma de pagamento");
        return;
    }
    
    if (paymentOption.value === "Dinheiro") {
        const needChange = document.querySelector('input[name="changeOption"]:checked');
        if (!needChange) {
            showCoolNotification("❌ Selecione se precisa de troco");
            return;
        }
        
        if (needChange.value === "sim") {
            const cashValue = document.getElementById('cashValue');
            if (!validateField(cashValue.value, "o valor em dinheiro")) return;
        }
    }
    
    document.getElementById('orderConfirmation').style.display = 'block';
}

function sendOrderAndReturnToCatalog() {
    const name = document.getElementById('nameInput').value.trim();
    const notes = document.getElementById('orderNotes').value.trim();
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;
    const address = deliveryOption === "Receber em casa" ? document.getElementById('addressInput').value.trim() : "";
    
    let paymentDetails = paymentOption;
    if (paymentOption === "Dinheiro") {
        const needChange = document.querySelector('input[name="changeOption"]:checked').value;
        if (needChange === "sim") {
            const cashValue = document.getElementById('cashValue').value;
            paymentDetails += ` (Troco para R$ ${cashValue})`;
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
    message += `*Cliente:* ${name}\n\n`;
    
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
    
    message += `*Forma de entrega:* ${deliveryOption}\n`;
    if (deliveryOption === "Receber em casa") {
        message += `*Endereço:* ${address}\n`;
    }
    message += `*Forma de pagamento:* ${paymentDetails}\n\n`;
    
    if (notes) {
        message += `*Observações:*\n${notes}\n\n`;
    }
    
    message += `Aguardando confirmação!\nObrigado por escolher MJ Águas!`;
    
    // Enviar para WhatsApp
    const phone = "5511965201725"; // Número do WhatsApp
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Resetar tudo
    resetOrder();
}

function resetOrder() {
    cart = [];
    cupomAplicado = null;
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('cartDetails').style.display = 'none';
    document.getElementById('cartCount').textContent = '0';
    document.getElementById('nameInput').value = '';
    document.getElementById('orderNotes').value = '';
    document.getElementById('addressInput').value = '';
    document.getElementById('cashValue').value = '';
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.getElementById('cashOption').style.display = 'none';
    document.getElementById('locationOption').style.display = 'none';
    
    // Voltar para o catálogo
    showInicio();
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
