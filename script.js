// Your code here.

      
    <script>
        const container = document.querySelector('.container');
        const cubes = document.querySelectorAll('.cube');
        let isDragging = false;
        let startX;
        let startLeft;

        cubes.forEach(cube => {
            cube.addEventListener('mousedown', startDragging);
        });

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        function startDragging(e) {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseInt(window.getComputedStyle(this).left);
            this.style.zIndex = '1';
        }

        function drag(e) {
            if (!isDragging) return;
            
            const activeCube = document.querySelector('.cube[style*="z-index: 1"]');
            if (!activeCube) return;

            const deltaX = e.clientX - startX;
            const newLeft = startLeft + deltaX;

            // Limit the dragging range
            const containerRect = container.getBoundingClientRect();
            const cubeRect = activeCube.getBoundingClientRect();
            const minLeft = 0;
            const maxLeft = containerRect.width - cubeRect.width;

            activeCube.style.left = `${Math.max(minLeft, Math.min(maxLeft, newLeft))}px`;
        }

        function stopDragging() {
            if (!isDragging) return;

            isDragging = false;
            const activeCube = document.querySelector('.cube[style*="z-index: 1"]');
            if (!activeCube) return;

            activeCube.style.zIndex = '';

            // Snap to the nearest position
            const containerRect = container.getBoundingClientRect();
            const cubeRect = activeCube.getBoundingClientRect();
            const cubeCenter = cubeRect.left - containerRect.left + cubeRect.width / 2;
            const containerWidth = containerRect.width;
            const snapPositions = [0, containerWidth / 2 - cubeRect.width / 2, containerWidth - cubeRect.width];

            let closestPosition = snapPositions[0];
            let minDistance = Math.abs(cubeCenter - snapPositions[0]);

            for (let i = 1; i < snapPositions.length; i++) {
                const distance = Math.abs(cubeCenter - snapPositions[i]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPosition = snapPositions[i];
                }
            }

            activeCube.style.transition = 'left 0.3s ease';
            activeCube.style.left = `${closestPosition}px`;

            // Remove the transition after it's complete
            setTimeout(() => {
                activeCube.style.transition = '';
            }, 300);
        }
    </script>
