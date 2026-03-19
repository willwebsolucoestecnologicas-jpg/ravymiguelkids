// Dados simulados dos produtos
const products = [
    { id: 1, name: "Conjunto Verão Menino", price: 65.90, img: "https://via.placeholder.com/200x200?text=Produto+1", sizes: ["P", "M", "G"], colors: ["Azul", "Verde"] },
    { id: 2, name: "Vestido Floral Menina", price: 89.90, img: "https://via.placeholder.com/200x200?text=Produto+2", sizes: ["1", "2", "3", "4"], colors: ["Rosa", "Amarelo"] },
    { id: 3, name: "Camiseta Básica Kids", price: 35.00, img: "https://via.placeholder.com/200x200?text=Produto+3", sizes: ["4", "6", "8", "10"], colors: ["Branco", "Preto", "Azul"] },
    { id: 4, name: "Bermuda Jeans", price: 55.00, img: "https://via.placeholder.com/200x200?text=Produto+4", sizes: ["2", "4", "6"], colors: ["Jeans Claro", "Jeans Escuro"] },
    { id: 5, name: "Tênis Colorido", price: 110.00, img: "https://via.placeholder.com/200x200?text=Produto+5", sizes: ["22", "24", "26", "28"], colors: ["Multicolor"] },
    { id: 6, name: "Macaquinho Estampado", price: 75.50, img: "https://via.placeholder.com/200x200?text=Produto+6", sizes: ["P", "M", "G"], colors: ["Estampa 1", "Estampa 2"] },
    { id: 7, name: "Casaco de Lã Infantil", price: 120.00, img: "https://via.placeholder.com/200x200?text=Produto+7", sizes: ["4", "6", "8"], colors: ["Cinza", "Rosa", "Azul Marinho"] },
    { id: 8, name: "Calça Legging", price: 40.00, img: "https://via.placeholder.com/200x200?text=Produto+8", sizes: ["2", "4", "6", "8"], colors: ["Preto", "Rosa Bebê"] },
    { id: 9, name: "Pijama Animais", price: 59.90, img: "https://via.placeholder.com/200x200?text=Produto+9", sizes: ["P", "M", "G"], colors: ["Dinossauro", "Unicórnio"] },
    { id: 10, name: "Kit 3 Laços de Cabelo", price: 25.00, img: "https://via.placeholder.com/200x200?text=Produto+10", sizes: ["Único"], colors: ["Sortidas"] }
];

let cart = [];

// Renderizar produtos na tela
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    products.forEach(prod => {
        const sizeOptions = prod.sizes.map(s => `<option value="${s}">${s}</option>`).join('');
        const colorOptions = prod.colors.map(c => `<option value="${c}">${c}</option>`).join('');

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}" class="product-image">
            <div class="product-info">
                <h3>${prod.name}</h3>
                <p class="price">R$ ${prod.price.toFixed(2).replace('.', ',')}</p>
                
                <div class="product-options">
                    <select id="size-${prod.id}">${sizeOptions}</select>
                    <select id="color-${prod.id}">${colorOptions}</select>
                </div>
                
                <button class="btn-add" onclick="addToCart(${prod.id})">Adicionar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Lógica do Carrinho
function toggleCart() {
    document.getElementById('cart-overlay').classList.toggle('active');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const size = document.getElementById(`size-${id}`).value;
    const color = document.getElementById(`color-${id}`).value;

    const existingItem = cart.find(item => item.id === id && item.size === size && item.color === color);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, size, color, qty: 1 });
    }
    
    updateCart();
    
    // Mostra a notificação em vez de abrir o carrinho
    showToast(); 
}

// Nova função para mostrar a notificação (Toast) e animar o carrinho
function showToast() {
    // Exibe o Toast
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
    
    // Anima o ícone do carrinho para chamar atenção
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('cart-bounce');
    setTimeout(function(){ 
        cartIcon.classList.remove('cart-bounce'); 
    }, 300);
}

function updateQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');
    
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Cor: ${item.color} | Tam: ${item.size}</p>
                    <p>R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="qty-controls">
                    <button onclick="updateQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotalSpan.innerText = total.toFixed(2).replace('.', ',');
}

// Finalização via WhatsApp e envio ao AppScript (Opcional)
function finalizeOrder() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const name = document.getElementById('customer-name').value;
    const payment = document.getElementById('payment-method').value;

    if (!name) {
        alert("Por favor, preencha seu nome.");
        return;
    }

    let total = 0;
    let text = `*NOVO PEDIDO - Ravy Miguel KIDS*%0A%0A`;
    text += `*Cliente:* ${name}%0A`;
    text += `*Forma de Pagamento:* ${payment}%0A%0A`;
    text += `*Itens do Pedido:*%0A`;

    cart.forEach(item => {
        text += `- ${item.qty}x ${item.name} (Cor: ${item.color}, Tam: ${item.size}) - R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}%0A`;
        total += item.price * item.qty;
    });

    text += `%0A*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;

    // Chamada Assíncrona para o AppScript (Backup na Planilha) - Descomente se for usar
    /*
    const appScriptURL = 'SEU_LINK_DO_WEBAPP_AQUI';
    fetch(appScriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, pagamento: payment, total: total, itens: cart })
    });
    */

    // Redirecionamento WhatsApp
    const fone = "5583993379142";
    const zapLink = `https://wa.me/${fone}?text=${text}`;
    window.open(zapLink, '_blank');
    
    // Limpa o carrinho
    cart = [];
    updateCart();
    toggleCart();
}

// Iniciar a loja
renderProducts();
