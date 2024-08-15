document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('app-footer');
  
    const footerContent = `
        <div class="container footer-container">
            <h3 class="shop-name">The Shroomies</h3>
            <ul class="footer-nav">
                <li>
                    <a href="https://www.youtube.com" target="_blank">
                        <img src="./images/Youtube-Logo.png">
                    </a>
                </li>
                <li>
                    <a href="https://www.spotify.com" target="_blank">
                        <img src="./images/Spotify-Logo.png">
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com" target="_blank">
                        <img src="./images/Facebook-Logo.png">
                    </a>
                </li>
            </ul>
        </div>
    `;
  
    footer.innerHTML = footerContent;
  });
  