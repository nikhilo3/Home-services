


const fetchOrder = async () => {
    try {
        const response = await fetch('http://localhost:3000/adminorder/order', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                // 'Authorization': `Bearer ${token}` // replace token with your actual token
            }
        });
        if (response.ok) {
            const cartItems = await response.json();
            
        } else {
            console.log('Failed to fetch order', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching order:', err);
    }
}