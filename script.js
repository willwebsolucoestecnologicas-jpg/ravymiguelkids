// Dados simulados dos produtos
const products = [
    { 
        id: 1, 
        name: "Conjunto Verão Menino", 
        price: 65.90, 
        img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        sizes: ["P", "M", "G"], 
        colors: ["Azul", "Bege"] 
    },
    { 
        id: 2, 
        name: "Vestido Floral Menina", 
        price: 89.90, 
        img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80", 
        sizes: ["1", "2", "3", "4"], 
        colors: ["Rosa", "Amarelo"] 
    },
    { 
        id: 3, 
        name: "Camiseta Básica Kids", 
        price: 35.00, 
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQkug8F-bSgmuFaaFD-1-3U-MpsIUCif0wMw&s", 
        sizes: ["4", "6", "8", "10"], 
        colors: ["Branco", "Preto", "Azul"] 
    },
    { 
        id: 4, 
        name: "Bermuda Jeans", 
        price: 55.00, 
        img: "https://outletespacohering.vtexassets.com/arquivos/ids/5848958-1440-auto/C4KB-1ASN-C5.webp?v=638933038792300000&quality=10", 
        sizes: ["2", "4", "6"], 
        colors: ["Jeans Claro", "Jeans Escuro"] 
    },
    { 
        id: 5, 
        name: "Tênis Colorido", 
        price: 110.00, 
        img: "https://www.criatividadematerna.com/cdn/shop/products/S2a1f562793c7427f9fd51f14b99991b28.jpg?v=1681520388", 
        sizes: ["22", "24", "26", "28"], 
        colors: ["Multicolor"] 
    },
    { 
        id: 6, 
        name: "Macaquinho Estampado", 
        price: 75.50, 
        img: "https://malwee.vtexassets.com/arquivos/ids/1042266-805-1010", 
        sizes: ["P", "M", "G"], 
        colors: ["Tucano", "Arara"] 
    },
    { 
        id: 7, 
        name: "Casaco de Lã Infantil", 
        price: 120.00, 
        img: "https://cdn.awsli.com.br/600x450/545/545706/produto/52556136/e1e26f072c.jpg", 
        sizes: ["4", "6", "8"], 
        colors: ["Creme", "Rosa Bebê"] 
    },
    { 
        id: 8, 
        name: "Calça Legging", 
        price: 40.00, 
        img: "https://malwee.vtexassets.com/arquivos/ids/506841-805-1010", 
        sizes: ["2", "4", "6", "8"], 
        colors: ["Cinza", "Preto"] 
    },
    { 
        id: 9, 
        name: "Pijama Animais", 
        price: 59.90, 
        img: "https://a-static.mlcdn.com.br/420x420/conjuntos-de-pijamas-de-animais-unissex-para-criancas-roupas-de-dormir-quentes-e-macias-para-o-none/aliexpress/2010139348/bd72f39bc9431636b97bb392e7d77bd5.jpeg", 
        sizes: ["P", "M", "G"], 
        colors: ["Coala", "Panda"] 
    },
    { 
        id: 10, 
        name: "Kit 3 Laços de Cabelo", 
        price: 25.00, 
        img: "https://img.elo7.com.br/product/685x685/5137ABD/kit-com-3-lacos-para-cabelos-6-5-cm-pronta-entrega-enfeites-para-cabelo-infantil.jpg", 
        sizes: ["Único"], 
        colors: ["Sortidas"] 
    }
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
