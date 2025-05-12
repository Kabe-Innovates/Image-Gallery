let currentIndex = 0;
        const images = document.querySelectorAll('.gallery img');
        const totalImages = images.length;

        // Open the lightbox
        function openLightbox(event) {
            if (event.target.tagName === 'IMG') {
                const clickedIndex = Array.from(images).indexOf(event.target);
                currentIndex = clickedIndex;
                updateLightboxImage();
                document.getElementById('lightbox').style.display = 'flex';
            }
        }

        // Close the lightbox
        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        // Change the lightbox image based on direction (1 for next, -1 for prev)
        function changeImage(direction) {
            currentIndex += direction;
            if (currentIndex >= totalImages) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = totalImages - 1;
            }
            updateLightboxImage();
        }

        // Update the lightbox image and thumbnails
        function updateLightboxImage() {
            const lightboxImg = document.getElementById('lightbox-img');
            const thumbnailContainer = document.getElementById('thumbnail-container');

            // Update the main lightbox image
            lightboxImg.src = images[currentIndex].src;

            // Clear existing thumbnails
            thumbnailContainer.innerHTML = '';

            // Add new thumbnails
            images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image.src;
                thumbnail.alt = `Thumbnail ${index + 1}`;
                thumbnail.classList.add('thumbnail');
                thumbnail.addEventListener('click', () => updateMainImage(index));
                thumbnailContainer.appendChild(thumbnail);
            });

            // Highlight the current thumbnail
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails[currentIndex].classList.add('active-thumbnail');
        }

        // Update the main lightbox image when a thumbnail is clicked
        function updateMainImage(index) {
            currentIndex = index;
            updateLightboxImage();
        }

        // Add initial thumbnails
        updateLightboxImage();


        // To add keyboard navigation (left/right arrow keys)
        document.addEventListener('keydown', function (e) {
            if (document.getElementById('lightbox').style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    changeImage(-1);
                } else if (e.key === 'ArrowRight') {
                    changeImage(1);
                }
            }
        });

                // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            let currentIndex = 0;
            const images = document.querySelectorAll('.gallery img');
            const totalImages = images.length;

            // ...existing code...

            // Add escape key support
            document.addEventListener('keydown', function(e) {
                if (document.getElementById('lightbox').style.display === 'flex') {
                    if (e.key === 'ArrowLeft') {
                        changeImage(-1);
                    } else if (e.key === 'ArrowRight') {
                        changeImage(1);
                    } else if (e.key === 'Escape') {
                        closeLightbox();
                    }
                }
            });

            // Initialize thumbnails only after DOM is loaded
            updateLightboxImage();
        });