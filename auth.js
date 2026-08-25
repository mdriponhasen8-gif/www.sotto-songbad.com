// লগইন ফাংশন
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // চেয়ারম্যান ক্রেডেনশিয়াল
    const adminUsername = 'admin';
    const adminPassword = 'Sangbad@2024';
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    if (username === adminUsername && password === adminPassword) {
        // লগইন সফল
        successDiv.textContent = '✓ লগইন সফল! আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...';
        successDiv.style.display = 'block';
        
        // সেশন ডেটা সেভ করুন
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // 2 সেকেন্ডের পর ড্যাশবোর্ডে রিডাইরেক্ট করুন
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    } else {
        // লগইন ব্যর্থ
        errorDiv.textContent = '✗ ইউজারনেম বা পাসওয়ার্ড ভুল!';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
    }
});

// পেজ লোড হলে লগইন চেক করুন
window.addEventListener('load', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // ইতিমধ্যে লগইন করা আছে
        window.location.href = 'dashboard.html';
    }
});