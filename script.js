document.addEventListener('DOMContentLoaded', function() {
    // Data lokasi (dalam persentase dari lebar/tinggi gambar)
    const locations = {
        balai: {
            x: 25,
            y: 40,
            color: 'primary'
        },
        puskesmas: {
            x: 65,
            y: 55,
            color: 'danger'
        },
        sekolah: {
            x: 75,
            y: 30,
            color: 'success'
        }
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