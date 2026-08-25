// ড্যাশবোর্ড লোডিং
window.addEventListener('load', function() {
    // লগইন চেক করুন
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // ইউজারনেম প্রদর্শন করুন
    const username = localStorage.getItem('username');
    
    // সংবাদ তালিকা লোড করুন
    loadNewsList();
    loadStatistics();
});

// সেকশন প্রদর্শন করুন
function showSection(sectionId) {
    // সব সেকশন লুকান
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // নির্বাচিত সেকশন প্রদর্শন করুন
    document.getElementById(sectionId).classList.add('active');
    
    // মেনু আইটেম আপডেট করুন
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.menu-item').classList.add('active');
    
    // সংবাদ তালিকা লোড করুন যদি প্রয়োজন
    if (sectionId === 'manage-news') {
        loadNewsList();
    }
    
    if (sectionId === 'statistics') {
        loadStatistics();
    }
}

// নতুন সংবাদ যোগ করার ফর্ম
document.getElementById('addNewsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('newsTitle').value;
    const description = document.getElementById('newsDescription').value;
    const category = document.getElementById('newsCategory').value;
    const importance = document.getElementById('newsImportance').value;
    const imageInput = document.getElementById('newsImage');
    
    // নতুন সংবাদ অবজেক্ট তৈরি করুন
    const newsItem = {
        id: Date.now(),
        title: title,
        description: description,
        category: category,
        importance: importance,
        image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null,
        date: new Date().toLocaleString('bn-BD'),
        author: 'মোঃ রিপন ইসলাম'
    };
    
    // লোকাল স্টোরেজে সংবাদ সেভ করুন
    let newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    newsList.unshift(newsItem);
    localStorage.setItem('newsList', JSON.stringify(newsList));
    
    // ফর্ম রিসেট করুন
    document.getElementById('addNewsForm').reset();
    
    // সফলতার বার্তা প্রদর্শন করুন
    const messageDiv = document.getElementById('addNewsMessage');
    messageDiv.innerHTML = '<div class="success-message">✓ সংবাদ সফলভাবে প্রকাশিত হয়েছে! সংবাদটি হোমপেজে দেখা যাবে।</div>';
    messageDiv.style.display = 'block';
    
    // 3 সেকেন্ডের পর বার্তা লুকান
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 3000);
});

// সংবাদ তালিকা লোড করুন
function loadNewsList() {
    const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    const newsListDiv = document.getElementById('newsList');
    
    if (newsList.length === 0) {
        newsListDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">এখনও কোনো সংবাদ প্রকাশিত হয়নি।</p>';
        return;
    }
    
    newsListDiv.innerHTML = '';
    
    newsList.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <div>
                <p class="news-item-title">${news.title}</p>
                <p style="font-size: 12px; color: #999;">${news.category} | ${news.importance} | ${news.date}</p>
            </div>
            <div class="news-item-actions">
                <button class="btn-small btn-edit" onclick="editNews(${news.id})">এডিট</button>
                <button class="btn-small btn-delete" onclick="deleteNews(${news.id})">ডিলিট</button>
            </div>
        `;
        newsListDiv.appendChild(newsItem);
    });
}

// সংবাদ ডিলিট করুন
function deleteNews(newsId) {
    if (confirm('এই সংবাদটি ডিলিট করতে চান?')) {
        let newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
        newsList = newsList.filter(news => news.id !== newsId);
        localStorage.setItem('newsList', JSON.stringify(newsList));
        loadNewsList();
        alert('✓ সংবাদ সফলভাবে ডিলিট করা হয়েছে।');
    }
}

// সংবাদ এডিট করুন
function editNews(newsId) {
    alert('এডিট ফাংশন শীঘ্রই যুক্ত করা হবে।');
}

// পরিসংখ্যান লোড করুন
function loadStatistics() {
    const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    
    // মোট সংবাদ
    document.getElementById('totalNews').textContent = newsList.length;
    
    // আজকের সংবাদ
    const today = new Date().toLocaleDateString('bn-BD');
    const todayNews = newsList.filter(news => {
        const newsDate = new Date(news.date).toLocaleDateString('bn-BD');
        return newsDate === today;
    }).length;
    document.getElementById('todayNews').textContent = todayNews;
}

// লগআউট ফাংশন
function logout() {
    if (confirm('আপনি কি সত্যিই লগআউট করতে চান?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTime');
        window.location.href = 'index.html';
    }
}