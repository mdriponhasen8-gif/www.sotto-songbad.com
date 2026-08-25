// সংবাদ ডেটা লোড করুন এবং প্রদর্শন করুন
window.addEventListener('load', function() {
    loadNews();
});

function loadNews() {
    const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    const newsContainer = document.getElementById('newsContainer');
    
    if (newsList.length === 0) {
        newsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #999;"><i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px;"></i><p style="font-size: 18px;">এখনও কোনো সংবাদ প্রকাশিত হয়নি। শীঘ্রই আপডেট হবে।</p></div>';
        return;
    }
    
    newsContainer.innerHTML = '';
    
    newsList.forEach((news, index) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s both`;
        newsCard.innerHTML = `
            <div class="news-image">
                ${news.image ? `<img src="${news.image}" alt="${news.title}">` : '<div style="width:100%; height:100%; background: linear-gradient(135deg, #d32f2f 0%, #1976d2 100%); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-newspaper" style="font-size: 50px;"></i></div>'}
            </div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-description">${news.description.substring(0, 100)}...</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">📅 ${news.date} | লিখেছেন: ${news.author || 'সম্পাদক'}</p>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// ফিল্টার ফাংশন
function filterNews(category) {
    const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    const newsContainer = document.getElementById('newsContainer');
    
    // বাটন আপডেট করুন
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    newsContainer.innerHTML = '';
    
    let filteredNews = newsList;
    if (category !== 'all') {
        filteredNews = newsList.filter(news => news.category === category);
    }
    
    if (filteredNews.length === 0) {
        newsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">এই ক্যাটাগরিতে কোনো সংবাদ নেই।</div>';
        return;
    }
    
    filteredNews.forEach((news, index) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s both`;
        newsCard.innerHTML = `
            <div class="news-image">
                ${news.image ? `<img src="${news.image}" alt="${news.title}">` : '<div style="width:100%; height:100%; background: linear-gradient(135deg, #d32f2f 0%, #1976d2 100%); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-newspaper" style="font-size: 50px;"></i></div>'}
            </div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-description">${news.description.substring(0, 100)}...</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">📅 ${news.date} | লিখেছেন: ${news.author || 'সম্পাদক'}</p>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// CSS এনিমেশন যোগ করুন
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);