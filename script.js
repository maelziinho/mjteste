/* Estilos gerais */
body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    background: #f5f5f5;
    color: #333;
}

/* Header */
.header {
    background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%);
    color: white;
    text-align: center;
    padding: 50px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

/* Bolhas */
.bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
}

.bubble {
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    animation: float 15s infinite ease-in-out;
}

.bubble:nth-child(1) {
    width: 80px;
    height: 80px;
    left: 10%;
    top: 10%;
    animation-duration: 20s;
}

.bubble:nth-child(2) {
    width: 120px;
    height: 120px;
    left: 25%;
    top: 30%;
    animation-duration: 15s;
}

.bubble:nth-child(3) {
    width: 60px;
    height: 60px;
    left: 70%;
    top: 20%;
    animation-duration: 12s;
}

.bubble:nth-child(4) {
    width: 100px;
    height: 100px;
    left: 80%;
    top: 60%;
    animation-duration: 18s;
}

.bubble:nth-child(5) {
    width: 50px;
    height: 50px;
    left: 40%;
    top: 70%;
    animation-duration: 10s;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) translateX(0);
    }
    50% {
        transform: translateY(-100px) translateX(50px);
    }
}

.header img {
    max-width: 250px;
    height: auto;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
}

.header-slogan {
    font-family: 'Water Brush', cursive;
    font-size: 2.5em;
    margin: 10px 0;
    color: white;
    position: relative;
    z-index: 1;
}

.catalog-button {
    background: white;
    color: #0066cc;
    border: none;
    padding: 8px 20px;  /* Reduzi o padding */
    border-radius: 20px; /* Bordas mais suaves */
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s;
    position: relative;
    z-index: 1;
    display: inline-block; /* Fundamental para não ocupar linha inteira */
    width: auto; /* Não ocupar 100% da largura */
    box-sizing: border-box;
    white-space: nowrap; /* Texto não quebra linha */
    text-align: center;
    max-width: 200px; /* Largura máxima */
}

.catalog-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.informacoes {
    margin-top: 20px;
    font-size: 0.9em;
    position: relative;
    z-index: 1;
}

/* Status */
.status-button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: default;
    margin-top: 15px;
    position: relative;
    z-index: 1;
    width: auto;
    max-width: 120px;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

.status-text {
    font-weight: bold;
    font-size: 0.9em;
}

/* Rodapé da Capa */
.footer-capa {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    text-align: center;
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.7);
    z-index: 1;
}

/* Categorias */
.categorias {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background: white;
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    z-index: 100;
}

.categoria-button {
    background: #0066cc;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
}

.categoria-button:hover {
    background: #004d99;
    transform: scale(1.1);
}

/* Produtos */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    padding: 15px;
}

.produto {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: all 0.3s;
}

.produto:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.produto img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.produto-content {
    padding: 15px;
}

.produto h3 {
    margin: 0 0 5px;
    color: #0066cc;
    font-size: 1em;
}

.produto p {
    margin: 0 0 10px;
    font-size: 0.8em;
    color: #666;
}

.produto-price {
    font-weight: bold;
    color: #0066cc;
    margin-bottom: 10px;
}

.produto button {
    background: #0066cc;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.produto button:hover {
    background: #004d99;
}

.produto button i {
    font-size: 1.1em;
}

/* Carrinho */
.cart-icon {
    position: fixed;
    top: 15px;
    right: 15px;
    background: #0066cc;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s;
}

.cart-icon:hover {
    transform: scale(1.1);
}

.cart-icon span {
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-details {
    position: fixed;
    top: 80px;
    right: 15px;
    background: white;
    width: 90%;
    max-width: 400px;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 1000;
    scrollbar-width: thin;
}

.cart-details::-webkit-scrollbar {
    width: 6px;
}

.cart-details::-webkit-scrollbar-thumb {
    background-color: #0066cc;
    border-radius: 3px;
}

.cart-details h3 {
    margin-top: 0;
    color: #0066cc;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.adjust-buttons {
    display: flex;
    align-items: center;
}

.adjust-buttons span {
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
}

.remove-item {
    color: red;
    cursor: pointer;
    user-select: none;
}

#cartTotal {
    font-weight: bold;
    text-align: right;
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

/* Observações */
.order-notes {
    margin: 10px 0;
}

.order-notes textarea {
    width: 100%;
    padding: 8px;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    min-height: 60px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

/* Formulários */
input[type="text"], 
input[type="number"], 
select {
    width: 100%;
    padding: 8px;
    margin: 5px 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

/* Botões */
button, 
.confirm-button, 
.remove-cupom-button {
    background: #0066cc;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.3s;
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    box-sizing: border-box;
}

button:hover, 
.confirm-button:hover, 
.remove-cupom-button:hover {
    background: #004d99;
}

.remove-cupom-button {
    background: #ff4444;
}

.remove-cupom-button:hover {
    background: #cc0000;
}

/* Confirmação */
.order-confirmation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    z-index: 1001;
}

.order-confirmation h1 {
    color: #0066cc;
    margin-bottom: 20px;
}

.confirmation-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
}

.confirmation-message,
.confirmation-time {
    margin: 5px 0;
    text-align: center;
    width: 100%;
    max-width: 300px;
}

.social-media {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.follow-us {
    margin: 0 0 10px 0;
    font-weight: bold;
    color: #333;
}

.social-icons {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.social-icons a {
    color: #0066cc;
    font-size: 1.8em;
    transition: all 0.3s;
}

.social-icons a:hover {
    transform: scale(1.1);
}

.order-confirmation button {
    margin-top: 20px;
    padding: 12px 25px;
    font-size: 1em;
    max-width: 200px;
}

/* Rodapé */
.footer {
    background: #333;
    color: white;
    padding: 4px 0; /* Altura extremamente reduzida */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 28px; /* Altura mínima possível */
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.follow-us {
    margin: 0;
    font-weight: bold;
    color: #f5f3ee;
    font-size: 0.85em;
    display: inline; /* Garante que fique na mesma linha */
}

.social-icons {
    display: flex;
    gap: 12px;
}

.social-icons a {
    color: white;
    font-size: 1.1em; /* Tamanho dos ícones */
    transition: transform 0.2s;
}

.social-icons a:hover {
    transform: scale(1.1); /* Efeito hover sutil */
}

/* Garantindo que os ícones apareçam */
.fab {
    font-family: 'Font Awesome 6 Brands';
    font-style: normal;
}

/* Responsivo */
@media (max-width: 600px) {
    .header-slogan {
        font-size: 2em;
    }
    
    .grid {
        grid-template-columns: 1fr 1fr;
    }
    
    .cart-details {
        width: 95%;
        right: 2.5%;
    }
    
    .produto button {
        padding: 8px;
        font-size: 0.8em;
    }

    .footer {
        padding: 8px 0;
    }
}

@media (max-width: 600px) {
    .cart-icon {
        width: 40px; /* Reduz o tamanho do ícone */
        height: 40px;
        top: 10px;
        right: 10px;
    }
    
    .cart-icon span {
        width: 16px;
        height: 16px;
        font-size: 0.6em;
    }
    
    .cart-details {
        top: 60px;
        right: 10px;
        width: calc(100% - 20px);
        max-width: none;
        font-size: 0.9em;
    }
    
    .cart-item {
        font-size: 0.8em;
        padding: 6px 0;
    }
    
    .adjust-buttons span {
        margin: 0 3px;
    }
    
    #cartTotal {
        font-size: 0.9em;
        padding: 8px 0;
    }
}
