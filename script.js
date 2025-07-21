document.addEventListener('DOMContentLoaded', function() {
    // Data lokasi (dalam persentase dari lebar/tinggi gambar)
    const locations = {
        balai: { x: 50, y: 80, color: 'primary' },
        rw: { x: 85, y: 11, color: 'info' },
        dukuh: { x: 83, y: 15, color: 'secondary' },
        rt34: { x: 39, y: 52, color: 'success' },
        rt35: { x: 78, y: 35, color: 'success' },
        karangtaruna: { x: 80, y: 84, color: 'warning' },
        lpmp: { x: 50, y: 75, color: 'danger' }
    };

    const desaMap = document.getElementById('desa-map');
    const locationButtons = document.querySelectorAll('.location-btn');
    const markers = document.querySelectorAll('.location-marker');

    // Fungsi untuk memperbarui posisi semua marker
    function updateMarkersPosition() {
        if (desaMap.complete) {
            const imgWidth = desaMap.offsetWidth;
            const imgHeight = desaMap.offsetHeight;
            
            markers.forEach(marker => {
                const location = marker.dataset.location;
                const x = (locations[location].x / 100) * imgWidth;
                const y = (locations[location].y / 100) * imgHeight;
                
                marker.style.left = `${x}px`;
                marker.style.top = `${y}px`;
            });
        }
    }

    // Fungsi untuk toggle marker
    function toggleMarker(location, button) {
        const marker = document.querySelector(`.location-marker[data-location="${location}"]`);
        const isActive = marker.style.display === 'block';
        
        if (isActive) {
            // Nonaktifkan marker
            marker.style.display = 'none';
            button.classList.remove(`btn-${locations[location].color}`);
            button.classList.add(`btn-outline-${locations[location].color}`);
        } else {
            // Aktifkan marker
            marker.style.display = 'block';
            button.classList.remove(`btn-outline-${locations[location].color}`);
            button.classList.add(`btn-${locations[location].color}`);
        }
    }

    // Event listener untuk tombol lokasi
    locationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const location = this.dataset.location;
            toggleMarker(location, this);
        });
    });

    // Update posisi saat resize
    window.addEventListener('resize', updateMarkersPosition);

    // Inisialisasi posisi marker
    if (desaMap.complete) {
        updateMarkersPosition();
    } else {
        desaMap.addEventListener('load', updateMarkersPosition);
    }

    // Aktifkan smooth scroll untuk nav link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link saat scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});