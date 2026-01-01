// Custom UI Customizations
// Modify this file to customize the CustomGPT UI after login

const customizations = {
  // CSS customizations
  css: `
    /* Hide Dashboard button - will be handled by JavaScript */
    /* Hide Notifications button - will be handled by JavaScript */
    
    /* Hide CustomGPT.ai Copilot section - handled by JavaScript */
    
    /* Add your CSS customizations here */
    /* Example: Hide sidebar */
    /* aside, .sidebar { display: none !important; } */
    
    /* Example: Change theme colors */
    /* :root { --primary-color: #667eea; } */
    
    /* Example: Customize chat interface */
    /* .chat-container { background: #f8f9fa !important; } */

    /* changing primary color in theme */
    .v-theme--CustomGPT {
      --v-theme-primary: 0,0,0 !important;
    }
    .v-theme--CustomGPT .bg-primary-100 {
      background-color: rgba(var(--v-theme-primary),0.1) !important;
    }

    /* Hide "Actions" sidebar link: https://app.customgpt.ai/projects/{ID}/actions in agents section */
    a.link[href*="/projects/"][href$="/actions"] {
      display: none !important;
    }

    /* Hide "Deploy" sidebar link: https://app.customgpt.ai/projects/{ID}/sharing-settings in agents section */
    a.link[href*="/projects/"][href$="/sharing-settings"] {
      display: none !important;
    }

    /* Prompt Modal Styles */
    .prompt-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }

    .prompt-modal {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .prompt-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      padding-inline: 20px;
    }

    .prompt-modal-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .prompt-modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .prompt-modal-close:hover {
      background-color: #f5f5f5;
      color: #333;
    }

    .prompt-modal-body {
      padding: 20px;
    }

    .prompt-form-group {
      margin-bottom: 20px;
    }

    .prompt-form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .prompt-input,
    .prompt-textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
    }

    .prompt-input:focus,
    .prompt-textarea:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .prompt-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .prompt-error-message {
      display: block;
      margin-top: 4px;
      color: #dc3545;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .prompt-error-message.visible {
      opacity: 1;
    }


    .image-placeholder {
      border-style: dashed !important;
    }

    .prompt-btn-secondary {
      background: #f8f9fa;
      border: 1px solid #ddd;
      color: #333;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .prompt-btn-secondary:hover {
      background: #e9ecef;
    }

    .prompt-modal-footer {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: flex-end;
    }

    .prompt-submit-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .prompt-submit-btn:hover:not(:disabled) {
      background: #0056b3;
    }

    .prompt-submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .prompt-btn-danger {
      background: #dc3545;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      margin-left: 12px;
      transition: background-color 0.2s;
    }

    .prompt-btn-danger:hover:not(:disabled) {
      background: #c82333;
    }

    .prompt-btn-danger:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Image Modal Styles */
    .image-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
    }

    .image-modal {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-width: 900px;
      width: 90%;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .image-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    .image-modal-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .image-modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    .image-modal-close:hover {
      background-color: #f5f5f5;
      color: #333;
    }

    .image-modal-body {
      padding: 20px;
      flex: 1;
      overflow-y: auto;
    }

    .image-modal-footer {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: flex-end;
    }

    .image-btn-secondary {
      background: #f8f9fa;
      border: 1px solid #ddd;
      color: #333;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .image-btn-secondary:hover {
      background: #e9ecef;
    }

    .image-item:hover {
      border-color: #007bff !important;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    a.link.cursor-pointer[class~="ml-0.5"][href*="/projects"] {
      margin: 0 !important;
    }

    .v-overlay__scrim  {
      display: none !important;
    }

    /* Hide body content until customizations are applied */
    body {
      visibility: hidden;
    }

    /* Initial Loading Overlay - injected early before first paint */
    #__easybot_loading__ {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #__easybot_loading__ .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e0e0e0;
      border-top-color: #000;
      border-radius: 50%;
      animation: easybot-spin 0.8s linear infinite;
    }
    @keyframes easybot-spin {
      to { transform: rotate(360deg); }
    }

    span.cc-1qbp0.cc-1o31k{
      display: none !important;
    }
    .cc-yv368 .cc-1kr6o .cc-18ov6 .cc-1qbp0{
      display: none !important;
    }

    /* Custom Website Modal Styles */
    .easybot-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .easybot-modal {
      background: #fff;
      border-radius: 12px;
      width: 500px;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .easybot-modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .easybot-modal-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .easybot-modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      line-height: 1;
    }
    .easybot-modal-close:hover {
      color: #000;
    }
    .easybot-modal-body {
      padding: 24px;
    }
    .easybot-form-group {
      margin-bottom: 20px;
    }
    .easybot-input-wrapper {
      display: flex;
      border: 1px solid #d0d0d0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    .easybot-input-wrapper:focus-within {
      border-color: #000;
    }
    .easybot-input-prefix {
      background: #f5f5f5;
      padding: 10px 12px;
      color: #666;
      font-size: 14px;
      border-right: 1px solid #d0d0d0;
    }
    .easybot-input,
    .easybot-textarea {
      flex: 1;
      border: none;
      padding: 10px 12px !important;
      font-size: 14px;
      outline: none;
      font-family: inherit;
    }
    .easybot-textarea {
      resize: vertical;
      min-height: 100px;
    }
    .easybot-input-wrapper.error {
      border-color: #f44336;
    }
    .easybot-error-message {
      display: none;
      color: #f44336;
      font-size: 12px;
      margin-top: 6px;
    }
    .easybot-error-message.visible {
      display: block;
    }
    .easybot-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .easybot-select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d0d0d0;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
      background: #fff;
    }
    .easybot-select:focus {
      border-color: #000;
    }
    .easybot-custom-schedule {
      margin-top: 16px;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      display: none;
    }
    .easybot-custom-schedule.visible {
      display: block;
    }
    .easybot-weekdays {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .easybot-weekday-chip {
      padding: 6px 14px;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      font-size: 13px;
      cursor: pointer;
      background: #fff;
      transition: all 0.2s;
    }
    .easybot-weekday-chip.selected {
      background: #000;
      color: #fff;
      border-color: #000;
    }
    .easybot-time-inputs {
      display: flex;
      gap: 12px;
      margin-top: 12px;
    }
    .easybot-time-input {
      flex: 1;
    }
    .easybot-time-input input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d0d0d0;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
    }
    .easybot-time-input input:focus {
      border-color: #000;
    }
    .easybot-time-input span {
      display: block;
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    .easybot-modal-footer {
      padding: 16px 24px 24px;
    }
    .easybot-note {
      font-size: 13px;
      color: #666;
      margin-bottom: 16px;
      text-align: center;
    }
    .easybot-submit-btn {
      width: 100%;
      padding: 12px;
      background: #000;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .easybot-submit-btn:hover {
      background: #333;
    }
    .easybot-sharepoint-message {
      font-size: 15px;
      line-height: 1.6;
      color: #333;
      margin: 0;
    }

    div#activatorElement > .flex.flex-col.gap-1.rounded.bg-white.px-2.py-1.shadow-card > a[href="https://app.customgpt.ai/teams"] {
      display: none !important;
    }

    .spinner {
      width: 48px;
      height: 48px;
      border: 5px solid #ddd;
      border-top-color: #333;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .flex.min-h-screen.flex-col > .v-container.v-container--fluid.v-locale--is-ltr.py-0.flex.items-center.justify-center.gap-16.py-8.h-screen{
      visibility: hidden !important;
    }

    .v-overlay__content[style="width: 600px;"] > button.v-btn.v-btn--icon.v-theme--CustomGPT.bg-white.v-btn--density-compact.v-btn--size-default.v-btn--variant-flat.absolute.z-10.shadow {
      display: none !important;
    }

    a[href^="https://app.customgpt.ai/projects/"][href$="/personalize"] {
      display: none !important;
    }

    div.v-overlay__content > div.text-center.flex-column.flex.gap-2.p-4 > button.v-btn.v-theme--CustomGPT.text-primary.v-btn--density-default.v-btn--size-default.v-btn--variant-tonal {
      display: none !important;
    }

    .prompt-cards-list, .prompt-cards-list > li {
      list-style: none;
      padding: 0;
    }

    .prompt-cards-list > li.dragging {
      opacity: 0.5;
    }

    .prompt-cards-list > div:not(:last-child){
      border-bottom: 1px solid #e0e0e0;
    }

    .prompt-card-title {
      font-size: 18px !important;
    }

    .prompt-card-subtitle {
      font-size: 14px !important;
      color: #666 !important;
    }

    .hide-loader {
      display: none !important;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
    }

    .loading-state-container {
      position: absolute;
      min-height: 100%;
      min-width: calc(100% - 280px);
      top: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: grid;
      place-items: center;
    }

    main {
      position: relative;
    }

    /* Pagination Styles */
    .pagination-controls {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .pagination-info {
      color: #666;
      font-weight: 500;
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    a[href="/profile#api"] {
      display: none !important;
    }

    /* Custom toggle switch styles */
    .custom-toggle-container {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .custom-toggle-label {
      font-weight: 500;
      color: #333;
      cursor: pointer;
      margin: 0;
      user-select: none;
    }

    .custom-toggle-label p {
      margin: 0;
      font-size: 14px;
    }

    .custom-toggle-switch {
      position: relative;
      display: inline-block;
    }

    .custom-toggle-switch input {
      display: none;
    }

    .custom-toggle-track {
      width: 30px;
      height: 18px;
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      user-select: none;
    }

    .custom-toggle-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      cursor: pointer;
      transition: transform 0.2s ease, background-color 0.2s ease;
      user-select: none;
    }

    /* Unchecked state */
    .custom-toggle-switch[data-checked="false"] .custom-toggle-track {
      background-color: #f5f5f5;
      border: 1px solid #dbdade;
    }

    .custom-toggle-switch[data-checked="false"] .custom-toggle-thumb {
      background-color: #dbdade;
      transform: translateX(0);
      margin-top: 1px !important;
    }

    /* Checked state */
    .custom-toggle-switch[data-checked="true"] .custom-toggle-track {
      background-color: black;
      border: 1px solid black;
    }

    .custom-toggle-switch[data-checked="true"] .custom-toggle-thumb {
      background-color: white;
      transform: translateX(14px);
      margin-top: 1px !important;
    }

  `,

  // JavaScript customizations
  js: `
    (function() {
      // Prevent duplicate execution
      if (window.customGPTWrapperApplied) return;
      window.customGPTWrapperApplied = true;
      
      // Add your JavaScript customizations here
      
      // Track processed elements to avoid duplicates
      const processedElements = new WeakSet();
      
      // Replace logo images with EasyBot logo
      const hideLogoLink = () => {
        const newLogoUrl = 'https://www.easybot.chat/s/EasyBotChat-long.png';
        const oldLogoUrl = 'https://assets.customgpt.ai/assets/imgs/logos/logo.svg';
        
        // Function to replace logo on an image element
        const replaceLogo = (img) => {
          if (processedElements.has(img)) return;
          if (img.src && (img.src.includes('logo.svg') || img.src.includes('assets.customgpt.ai/assets/imgs/logos/logo.svg'))) {
            // Clear cache by adding timestamp
            img.src = newLogoUrl + '?t=' + Date.now();
            img.setAttribute('src', newLogoUrl + '?t=' + Date.now());
            // Force reload
            img.onerror = function() {
              this.onerror = null;
              this.src = newLogoUrl;
            };
            processedElements.add(img);
          }
        };

        // Target the specific v-img logo image with multiple selectors
        const selectors = [
          'img.v-img__img.v-img__img--contain[src*="logo.svg"]',
          'img.v-img__img.v-img__img--contain',
          'img[src*="assets.customgpt.ai/assets/imgs/logos/logo.svg"]',
          'img[src="https://assets.customgpt.ai/assets/imgs/logos/logo.svg"]',
          'img[src*="logo.svg"]'
        ];

        selectors.forEach(selector => {
          const images = document.querySelectorAll(selector);
          images.forEach(img => {
            if (img.src && (img.src.includes('logo.svg') || img.src.includes('assets.customgpt.ai/assets/imgs/logos/logo.svg'))) {
              replaceLogo(img);
            }
          });
        });

        // Also handle logo images inside links (existing logic)
        const logoLinks = document.querySelectorAll('a.link[href*="/projects"]');
        const smallLogoLinks = document.querySelectorAll('a.link.cursor-pointer[class~="ml-0.5"][href*="/projects"]');

        if(!smallLogoLinks?.length) {
          logoLinks.forEach(link => {
            if (processedElements.has(link)) return;
            const logoImg = link.querySelector('img[src*="logo.svg"]');
            if (logoImg) {
              replaceLogo(logoImg);
            }
          });
        } else {
          smallLogoLinks.forEach(link => {
            if (processedElements.has(link)) return;
            const logoImg = link.querySelector('img[src*="logo.svg"]');
            if (logoImg) {
              replaceLogo(logoImg);
            }
          });
        }

        // Watch for new images being added
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
          if (img.src && (img.src.includes('logo.svg') || img.src.includes('assets.customgpt.ai/assets/imgs/logos/logo.svg'))) {
            replaceLogo(img);
          }
        });
      };
      
      // Apply SVG color changes immediately
      const applySVGStyles = () => {
        const svgs = document.querySelectorAll('svg.change-path-stroke path');
        svgs.forEach(path => {
          if (processedElements.has(path)) return;
          if (path.getAttribute('fill') === '#7367F0' || path.style.fill === 'rgb(115, 103, 240)') {
            path.setAttribute('fill', '#000000');
            path.style.fill = '#000000';
            path.style.stroke = 'none';
            processedElements.add(path);
          }
        });
      };
      
      // Hide logo link and apply SVG styles immediately
      hideLogoLink();
      applySVGStyles();
      
      // Hide CustomGPT.ai Copilot section
      const hideCopilot = () => {
        const allDivs = document.querySelectorAll('div.mt-6');
        allDivs.forEach(div => {
          const heading = div.querySelector('h6');
          if (heading && heading.textContent.trim() === 'CustomGPT.ai Copilot') {
            div.style.display = 'none';
          }
        });
      };

      const getCurrentRoute = () => {
        const url = window.location.href;        // or window.location.pathname if you only want the path
        return url;
      };

      // Hide profile page extra tabs on /profile route
      const hideProfileTabsOnProfileRoute = () => {
        const currentRoute = getCurrentRoute();
        console.log("currentRoute------------------------------", currentRoute);
        if (!currentRoute.startsWith('https://app.customgpt.ai/profile')) return;

        // Hide profile page extra tabs
        const tabs = document.querySelectorAll('.tabs-parent.flex-wrap.gap-2.mt-6.flex > div:not(:first-child)');
        tabs.forEach(tab => {
          if (processedElements.has(tab)) return;
          tab.style.setProperty('display', 'none', 'important');
          processedElements.add(tab);
        });

        // Hide email from profile form
        const fieldContainers = document.querySelectorAll('.v-form.mt-2 > .v-row > div:not(:first-child)');
        fieldContainers.forEach(fieldContainer => {
          if (processedElements.has(fieldContainer)) return;
          fieldContainer.style.setProperty('display', 'none', 'important');
          processedElements.add(fieldContainer);
        });

        // Hide profile page extra sections
        const sections = document.querySelectorAll('.v-window__container > .v-row > div:not(:first-child)');
        sections.forEach(section => {
          if (processedElements.has(section)) return;
          section.style.setProperty('display', 'none', 'important');
          processedElements.add(section);
        });
      };

      // On /projects/{id}/personalize, hide specific tabs and sections
      const hidePersonalizeRouteElements = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/personalize')) return;

        // Hide 2nd and 5th tabs
        const secondTab = document.querySelector('.tabs-parent.mt-6.flex.flex-nowrap.overflow-x-hidden.underlined > div:nth-child(2)');
        const fifthTab = document.querySelector('.tabs-parent.mt-6.flex.flex-nowrap.overflow-x-hidden.underlined > div:nth-child(5)');

        if (secondTab && !processedElements.has(secondTab)) {
          secondTab.style.setProperty('display', 'none', 'important');
          processedElements.add(secondTab);
        }

        if (fifthTab && !processedElements.has(fifthTab)) {
          fifthTab.style.setProperty('display', 'none', 'important');
          processedElements.add(fifthTab);
        }

        // Hide all: .flex.gap-4 > .flex-1 > .relative.-mx-2
        const personalizeCards = document.querySelectorAll('.flex.gap-4 > .flex-1 > .relative.-mx-2');
        personalizeCards.forEach(card => {
          if (processedElements.has(card)) return;
          card.style.setProperty('display', 'none', 'important');
          processedElements.add(card);
        });

        // Hide specific sections by header text inside:
        // form > .flex.flex-col.gap-4 > section
        const sections = document.querySelectorAll('form > .flex.flex-col.gap-4 > section');
        const titlesToHide = new Set([
          'Conversation Sharing',
          'Conversation Exporting',
          'Branding',
          'Data Protection',
          'Recaptcha',
          'Affiliate ID',
          'Agent Role'
        ]);

        sections.forEach(section => {
          if (processedElements.has(section)) return;
          const heading = section.querySelector('.mb-4.items-center.gap-4.border-b.border-b-divider.pb-2.flex > h5');
          if (!heading) return;
          const title = heading.textContent.trim();
          if (!titlesToHide.has(title)) return;

          section.style.setProperty('display', 'none', 'important');
          processedElements.add(section);
        });
      };

      // On /projects/{id}/ask/{conversation_id}, hide specific controls
      const hideAskRouteElements = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.includes('/ask')) return;

        // Hide buttons inside the container
        const askContainerButtons = document.querySelectorAll('.items-center.gap-4.space-y-2.py-3.px-4 > button');
        askContainerButtons.forEach(btn => {
          if (processedElements.has(btn)) return;
          btn.style.setProperty('display', 'none', 'important');
          processedElements.add(btn);
        });

        // Hide the second <hr> inside the same container
        const secondHr = document.querySelector('.flex.h-full.max-h-full.overflow-y-auto.gap-4.flex-col > hr:nth-of-type(2)');
        if (secondHr && !processedElements.has(secondHr)) {
          secondHr.style.setProperty('display', 'none', 'important');
          processedElements.add(secondHr);
        }
        
        // Hide share agent icon
        const shareAgent = document.querySelector('.flex.min-w-0.items-center.gap-4 + div');
        if (shareAgent && !processedElements.has(shareAgent)) {
          shareAgent.style.setProperty('display', 'none', 'important');
          processedElements.add(shareAgent);
        }
      };

      // On /projects/{id}/analyze, hide export buttons and specific tabs
      const hideAnalyzeRouteElements = () => {
        const { pathname } = window.location;
        const pathEnds = ['/analyze', '/explore', '/outgoing-traffic'];
        if (!pathname.includes('/projects/') || !pathEnds.some(end => pathname.endsWith(end))) return;

        // Hide 4th and 5th tabs
        const fourthTab = document.querySelector('.tabs-parent.mt-6.flex.flex-nowrap.overflow-x-hidden.underlined > div:nth-child(4)');
        const fifthTab = document.querySelector('.tabs-parent.mt-6.flex.flex-nowrap.overflow-x-hidden.underlined > div:nth-child(5)');

        if (fourthTab && !processedElements.has(fourthTab)) {
          fourthTab.style.setProperty('display', 'none', 'important');
          processedElements.add(fourthTab);
        }

        if (fifthTab && !processedElements.has(fifthTab)) {
          fifthTab.style.setProperty('display', 'none', 'important');
          processedElements.add(fifthTab);
        }

        // Hide all buttons that contain "export" text (case insensitive)
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(btn => {
          if (processedElements.has(btn)) return;
          const innerText = btn.innerText || btn.textContent || '';
          if (innerText.toLowerCase().includes('export')) {
            btn.style.setProperty('display', 'none', 'important');
            processedElements.add(btn);
          }
        });
      };

      // On /projects/{id}/explore, hide export buttons and specific tabs
      const hideCustomerIntelligenceRouteElements = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/explore')) return;

        // Hide all buttons that contain "export" text (case insensitive)
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(btn => {
          if (processedElements.has(btn)) return;
          const innerText = btn.innerText || btn.textContent || '';
          if (innerText.toLowerCase().includes('export')) {
            btn.style.setProperty('display', 'none', 'important');
            processedElements.add(btn);
          }
        });
      };

      // On any /projects/ route, hide specific button elements
      const hideShareAgentButton = () => {
        try {
          const { pathname } = window.location;
          if (!pathname.includes('/projects/')) return;

          // Hide buttons with specific classes
          const targetButtons = document.querySelectorAll('.v-btn.v-theme--CustomGPT.text-primary.v-btn--density-default.v-btn--size-default.v-btn--variant-outlined.h-10.w-10.min-w-10.border-2');
          targetButtons.forEach(btn => {
            if (!processedElements.has(btn)) {
              btn.style.setProperty('display', 'none', 'important');
              processedElements.add(btn);
            }
          });
        } catch (error) {
          console.error('[EasyBot] Error in hideShareAgentButton:', error);
        }
      };

      // Customize build/sources page elements
      // Only on /projects/{ID}/build/sources page
      const customizeBuildSourcesPage = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/build/sources')) return;
        
        // 1. Hide integration cards that are not "File Upload", "Website", or "SharePoint Docs"
        const allowedTexts = new Set(['File Upload', 'Website', 'SharePoint Docs']);
        const integrationCards = document.querySelectorAll('.integration-card.text-center');
        
        integrationCards.forEach(card => {
          if (processedElements.has(card)) return;
          
          const textElement = card.querySelector('.flex.w-100.items-center.justify-start.gap-2.px-2 > p.font-normal.text-body.break-normal');
          
          if (textElement) {
            const text = textElement.innerText.trim();
            
            if (!allowedTexts.has(text)) {
              card.style.setProperty('display', 'none', 'important');
              processedElements.add(card);
            }
          }
        });
        
        // 2. Change "Build By Uploading Your Files" to "Upload Files"
        const cardTitles = document.querySelectorAll('.v-card.v-theme--CustomGPT.v-card--density-comfortable.rounded-card.v-card--variant-elevated.shadow-card.h-full > .v-card-item > .v-card-item__content > .v-card-title > h3.text-heading');
        cardTitles.forEach(title => {
          if (processedElements.has(title)) return;
          if (title.innerText.trim() === 'Build By Uploading Your Files') {
            title.innerText = 'Upload Files';
            processedElements.add(title);
          }
        });
        
        // 3. Change privacy text
        const paragraphs = document.querySelectorAll('.paragraph-small.font-medium.text-body.my-4');
        paragraphs.forEach(p => {
          if (processedElements.has(p)) return;
          // Change the text content
          p.innerText = 'Your privacy and security are important to us. All documents you upload are securely encrypted, processed and deleted from our systems.';
          
          // Hide any links inside this paragraph
          const links = p.querySelectorAll('a');
          links.forEach(link => {
            link.style.setProperty('display', 'none', 'important');
          });
          
          processedElements.add(p);
        });
        
        // 4. Change AI Vision text
        const aiVisionElements = document.querySelectorAll('.font-normal.text-body.cursor-pointer');
        aiVisionElements.forEach(element => {
          if (processedElements.has(element)) return;
          element.innerHTML = '<b>New</b>: Intelligently process your uploaded images with AI Vision';
          processedElements.add(element);
        });
        
        // 5. Shorten AI Vision credits text
        const creditElements = document.querySelectorAll('.me-1.text-body');
        creditElements.forEach(element => {
          if (processedElements.has(element)) return;
          if (element.innerText.includes('AI Vision Image Processing') && element.innerText.includes('Vision Credits used in this billing cycle')) {
            element.innerText = 'AI Vision Image Processing';
            processedElements.add(element);
          }
        });
        
        // 6. Hide documentation link
        const docLinks = document.querySelectorAll('.mt-4.flex.gap-4 > a[href="https://docs.customgpt.ai/docs/how-to-add-pdfs-and-documents"]');
        docLinks.forEach(link => {
          if (processedElements.has(link)) return;
          link.style.setProperty('display', 'none', 'important');
          processedElements.add(link);
        });

        // 7. Intercept Website card click to show custom modal
        integrationCards.forEach(card => {
          const textElement = card.querySelector('.flex.w-100.items-center.justify-start.gap-2.px-2 > p.font-normal.text-body.break-normal');
          if (textElement && textElement.innerText.trim() === 'Website') {
            if (card.dataset.easybotIntercepted) return;
            card.dataset.easybotIntercepted = 'true';
            
            card.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              showWebsiteModal();
            }, true);
          }
          
          // 8. Intercept SharePoint Docs card click to show custom modal
          if (textElement && textElement.innerText.trim() === 'SharePoint Docs') {
            if (card.dataset.easybotSharepointIntercepted) return;
            card.dataset.easybotSharepointIntercepted = 'true';
            
            card.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              showSharepointModal();
            }, true);
          }
        });
      };

      // Show custom Website modal
      const showWebsiteModal = () => {
        // Remove existing modal if any
        const existingModal = document.querySelector('.easybot-modal-overlay');
        if (existingModal) existingModal.remove();

        const modalHTML = \`
          <div class="easybot-modal-overlay">
            <div class="easybot-modal">
              <div class="easybot-modal-header">
                <h2>Add Website</h2>
                <button class="easybot-modal-close" type="button">&times;</button>
              </div>
              <div class="easybot-modal-body">
                <div class="easybot-form-group">
                  <label>Website URL</label>
                  <div class="easybot-input-wrapper" id="easybot-url-wrapper">
                    <span class="easybot-input-prefix">https://</span>
                    <input type="text" class="easybot-input" id="easybot-website-url" placeholder="example.com">
                  </div>
                  <span class="easybot-error-message" id="easybot-url-error"></span>
                </div>

                <div class="easybot-form-group">
                  <div class="easybot-checkbox-group">
                    <div
                      class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--CustomGPT v-locale--is-ltr v-switch v-switch--inset"
                      data-checked="false"
                    >
                      <div class="v-input__control">
                        <div class="v-selection-control v-selection-control--density-compact flex items-center">
                          <div class="v-selection-control__wrapper">
                            <div class="v-switch__track"></div>
                            <div class="v-selection-control__input">
                              <input
                                id="easybot-crawl-entire"
                                aria-disabled="false"
                                type="checkbox"
                                value="true"
                              />
                              <div class="v-switch__thumb"></div>
                            </div>
                          </div>
                          <label
                            class="v-label v-label--clickable"
                            for="easybot-crawl-entire"
                            style="opacity: 1"
                          >
                            <p class="font-normal text-body me-2">Crawl Entire Site</p>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div
                      class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--CustomGPT v-locale--is-ltr v-switch v-switch--inset"
                      data-checked="false"
                    >
                      <div class="v-input__control">
                        <div class="v-selection-control v-selection-control--density-compact">
                          <div class="v-selection-control__wrapper">
                            <div class="v-switch__track"></div>
                            <div class="v-selection-control__input">
                              <input
                                id="easybot-login-required"
                                aria-disabled="false"
                                type="checkbox"
                                value="true"
                              />
                              <div class="v-switch__thumb"></div>
                            </div>
                          </div>
                          <label
                            class="v-label v-label--clickable"
                            for="easybot-login-required"
                            style="opacity: 1"
                          >
                            <p class="font-normal text-body me-2">Login Required</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="easybot-form-group">
                  <label>Refresh Schedule</label>
                  <select class="easybot-select" id="easybot-schedule">
                    <option value="never">Never</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div class="easybot-custom-schedule" id="easybot-custom-schedule">
                  <div class="easybot-form-group">
                    <label>Repeat on (days)</label>
                    <div class="easybot-weekdays">
                      <span class="easybot-weekday-chip" data-day="mon">Mon</span>
                      <span class="easybot-weekday-chip" data-day="tue">Tue</span>
                      <span class="easybot-weekday-chip" data-day="wed">Wed</span>
                      <span class="easybot-weekday-chip" data-day="thu">Thu</span>
                      <span class="easybot-weekday-chip" data-day="fri">Fri</span>
                      <span class="easybot-weekday-chip" data-day="sat">Sat</span>
                      <span class="easybot-weekday-chip" data-day="sun">Sun</span>
                    </div>
                  </div>
                  <div class="easybot-form-group">
                    <label>Repeat at (time)</label>
                    <div class="easybot-time-inputs">
                      <div class="easybot-time-input">
                        <input type="number" id="easybot-hour" min="0" max="23" placeholder="12">
                        <span>Hour (0-23)</span>
                      </div>
                      <div class="easybot-time-input">
                        <input type="number" id="easybot-minute" min="0" max="59" placeholder="00">
                        <span>Minute (0-59)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="easybot-modal-footer">
                <p class="easybot-note">Allow 1-2 business days for site to be indexed and added</p>
                <button class="easybot-submit-btn" id="easybot-submit">Add Website</button>
              </div>
            </div>
          </div>
        \`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.easybot-modal-overlay');
        const closeBtn = modal.querySelector('.easybot-modal-close');
        const scheduleSelect = modal.querySelector('#easybot-schedule');
        const customScheduleDiv = modal.querySelector('#easybot-custom-schedule');
        const weekdayChips = modal.querySelectorAll('.easybot-weekday-chip');
        const submitBtn = modal.querySelector('#easybot-submit');

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });

        // Close button
        closeBtn.addEventListener('click', () => modal.remove());

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Handle switch toggle for checkboxes
        const switches = modal.querySelectorAll('.v-switch');
        switches.forEach(switchEl => {
          const checkbox = switchEl.querySelector('input[type="checkbox"]');
          if (checkbox) {
            const selectionControl = switchEl.querySelector('.v-selection-control');
            const wrapper = switchEl.querySelector('.v-selection-control__wrapper');
            const track = switchEl.querySelector('.v-switch__track');
            
            // Update visual state when checkbox changes
            const updateState = () => {
              const isChecked = checkbox.checked;
              
              // Update data-checked attribute
              switchEl.setAttribute('data-checked', isChecked ? 'true' : 'false');
              
              // Toggle classes on selection control
              if (selectionControl) {
                selectionControl.classList.toggle('v-selection-control--dirty', isChecked);
              }
              
              // Toggle classes on wrapper
              if (wrapper) {
                wrapper.classList.toggle('text-primary', isChecked);
              }
              
              // Toggle classes on track
              if (track) {
                track.classList.toggle('bg-primary', isChecked);
              }
            };
            
            checkbox.addEventListener('change', updateState);
            
            // Also handle clicks on the wrapper/track/thumb
            if (wrapper) {
              wrapper.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                  checkbox.checked = !checkbox.checked;
                  updateState();
                }
              });
            }
            
            // Handle clicks on the label
            const label = switchEl.querySelector('.v-label');
            if (label) {
              label.addEventListener('click', (e) => {
                e.preventDefault();
                checkbox.checked = !checkbox.checked;
                updateState();
              });
            }
          }
        });

        // Schedule select change
        scheduleSelect.addEventListener('change', (e) => {
          if (e.target.value === 'custom') {
            customScheduleDiv.classList.add('visible');
          } else {
            customScheduleDiv.classList.remove('visible');
          }
        });

        // Weekday chip selection
        weekdayChips.forEach(chip => {
          chip.addEventListener('click', () => {
            chip.classList.toggle('selected');
          });
        });

        // Validation helper
        const urlInput = modal.querySelector('#easybot-website-url');
        const urlWrapper = modal.querySelector('#easybot-url-wrapper');
        const urlError = modal.querySelector('#easybot-url-error');
        
        const validateUrl = (url) => {
          // Remove any leading/trailing whitespace
          url = url.trim();
          
          // Check if empty
          if (!url) {
            return { valid: false, message: 'Please enter a website URL' };
          }
          
          // Must contain at least one dot
          if (url.indexOf('.') === -1) {
            return { valid: false, message: 'Please enter a valid URL (e.g., example.com)' };
          }
          
          // Split by dot to check TLD
          const parts = url.split('/')[0].split('.'); // Get domain part before any path
          const tld = parts[parts.length - 1];
          
          // TLD must be at least 2 characters and only letters
          if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
            return { valid: false, message: 'Please enter a valid URL (e.g., example.com)' };
          }
          
          // Domain part (before TLD) must exist and be valid
          const domain = parts.slice(0, -1).join('.');
          if (!domain || domain.length === 0) {
            return { valid: false, message: 'Please enter a valid URL (e.g., example.com)' };
          }
          
          // Check for invalid characters in domain
          if (!/^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/.test(url.split('/')[0]) && url.split('/')[0].length > 1) {
            return { valid: false, message: 'Please enter a valid URL (e.g., example.com)' };
          }
          
          return { valid: true, message: '' };
        };
        
        const showError = (message) => {
          urlWrapper.classList.add('error');
          urlError.textContent = message;
          urlError.classList.add('visible');
        };
        
        const clearError = () => {
          urlWrapper.classList.remove('error');
          urlError.textContent = '';
          urlError.classList.remove('visible');
        };
        
        // Clear error on input
        urlInput.addEventListener('input', clearError);

        // Extract projectId from URL for email
        const pathname = window.location.pathname;
        const projectIdMatch = pathname.match(/\\/projects\\/(\\d+)/);
        const projectId = projectIdMatch ? projectIdMatch[1] : 'UNKNOWN';

        // Submit button
        submitBtn.addEventListener('click', async () => {
          const websiteUrl = urlInput.value.trim();
          
          // Validate URL
          const validation = validateUrl(websiteUrl);
          if (!validation.valid) {
            showError(validation.message);
            urlInput.focus();
            return;
          }
          
          clearError();
          
          const crawlEntire = modal.querySelector('#easybot-crawl-entire').checked;
          const loginRequired = modal.querySelector('#easybot-login-required').checked;
          const schedule = scheduleSelect.value;
          
          const formData = {
            websiteUrl: 'https://' + websiteUrl,
            crawlEntireSite: crawlEntire,
            loginRequired: loginRequired,
            schedule: schedule
          };

          if (schedule === 'custom') {
            const selectedDays = Array.from(modal.querySelectorAll('.easybot-weekday-chip.selected'))
              .map(chip => chip.dataset.day);
            const hour = modal.querySelector('#easybot-hour').value || '12';
            const minute = modal.querySelector('#easybot-minute').value || '00';
            
            formData.customSchedule = {
              days: selectedDays,
              time: {
                hour: parseInt(hour, 10),
                minute: parseInt(minute, 10)
              }
            };
          }

          // Disable button and show loading
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';

          try {
            // Check if electronAPI is available
            if (window.electronAPI && window.electronAPI.sendWebsiteEmail) {
              const result = await window.electronAPI.sendWebsiteEmail({
                projectId: projectId,
                formData: formData
              });

              if (result.success) {
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                console.log('[EasyBot] Website email sent for project:', projectId);
                
                // Close modal after success
                setTimeout(() => {
                  modal.remove();
                }, 1500);
              } else {
                throw new Error(result.error || 'Failed to send email');
              }
            } else {
              // Fallback: just log (for non-Electron environments)
              console.log('[EasyBot] Website Form Submitted:', formData);
              submitBtn.textContent = 'Submitted!';
              setTimeout(() => modal.remove(), 1000);
            }
          } catch (error) {
            console.error('[EasyBot] Failed to send Website email:', error);
            submitBtn.textContent = 'Failed - Try Again';
            submitBtn.style.backgroundColor = '#f44336';
            submitBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
            }, 3000);
          }
        });
      };

      // Modal for creating new prompt card
      const showCreatePromptModal = () => {
        // Remove existing modal if any
        const existingModal = document.querySelector('.prompt-modal-overlay');
        if (existingModal) existingModal.remove();

        const modalHTML = '<div class="prompt-modal-overlay">' +
          '<div class="prompt-modal">' +
            '<div class="prompt-modal-header">' +
              '<h2>Create New Prompt Card</h2>' +
              '<button class="prompt-modal-close" type="button">&times;</button>' +
            '</div>' +
            '<div class="prompt-modal-body">' +
              '<div class="easybot-form-group">' +
                '<label>Title</label>' +
                '<div class="easybot-input-wrapper">' +
                  '<input type="text" class="easybot-input" id="create-title" placeholder="Enter prompt title">' +
                '</div>' +
                '<span class="easybot-error-message" id="create-title-error"></span>' +
              '</div>' +
              '<div class="easybot-form-group">' +
                '<label>Prompt Content</label>' +
                '<div class="easybot-input-wrapper">' +
                  '<textarea class="easybot-textarea" id="create-prompt" rows="4" placeholder="Enter your prompt content"></textarea>' +
                '</div>' +
                '<span class="easybot-error-message" id="create-prompt-error"></span>' +
              '</div>' +
              '<div class="easybot-form-group">' +
                '<label>Profile Image (Optional)</label>' +
                '<div class="image-upload-section d-flex flex-col gap-1">' +
                  '<div class="d-flex gap-1" style="padding-block: 10px;">' +
                    '<div class="current-image">' +
                    '<img id="create-image-preview" src="" alt="No image selected" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #e0e0e0; display: none;">' +
                    '<div id="create-image-placeholder" class="image-placeholder" style="width: 80px; height: 80px; border-radius: 50%; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">' +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>' +
                      '</svg>' +
                    '</div>' +
                  '</div>' +
                  '<div style="display: flex; align-items: center;">' +
                      '<button class="prompt-btn-secondary d-flex items-center gap-1" id="create-choose-image" type="button">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">' +
                          '<path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>' +
                        '</svg>' +
                        'Choose from Unsplash' +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                  '<div class="image-actions d-flex gap-1" style="display: flex; flex-direction: column; gap: 8px;">' +
                    '<div style="display: flex; align-items: center; gap: 8px;">' +
                      '<div class="easybot-input-wrapper" style="width: 100%;">' +
                        '<input type="url" class="easybot-input" id="create-image-url" placeholder="Enter JPG/PNG URL (95x95px - 1000px max)">' +
                      '</div>' +
                      '<button data-v-7dee89f7="" type="button" class="v-btn v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-outlined" style="text-transform: none;" id="create-load-url" style="width: 122px !important;"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content" data-no-activator=""> Load URL </span></button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="prompt-modal-footer">' +
              '<button type="button" class="v-btn v-theme--CustomGPT bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat" style="text-transform: none" id="create-submit">' +
                '<span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>'+
                '<span class="v-btn__content" data-no-activator=""> Create Prompt Card </span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.prompt-modal-overlay');
        const closeBtn = modal.querySelector('.prompt-modal-close');
        const submitBtn = modal.querySelector('#create-submit');
        const titleInput = modal.querySelector('#create-title');
        const promptTextarea = modal.querySelector('#create-prompt');
        const chooseImageBtn = modal.querySelector('#create-choose-image');
        const loadUrlBtn = modal.querySelector('#create-load-url');
        const imageUrlInput = modal.querySelector('#create-image-url');

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });

        // Close button
        closeBtn.addEventListener('click', () => modal.remove());

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Choose image button
        chooseImageBtn.addEventListener('click', () => {
          showImageSelectionModal((imageUrl) => {
            const preview = modal.querySelector('#create-image-preview');
            const placeholder = modal.querySelector('#create-image-placeholder');
            preview.src = imageUrl;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
            // Clear URL input when using Unsplash
            imageUrlInput.value = '';
          });
        });

        // Load URL button
        loadUrlBtn.addEventListener('click', async () => {
          const imageUrl = imageUrlInput.value.trim();
          if (!imageUrl) {
            alert('Please enter an image URL');
            return;
          }

          // Validate URL format
          if (!isValidImageUrl(imageUrl)) {
            alert('Please enter a valid JPG or PNG image URL');
            return;
          }

          // Test image loading and dimensions
          const isValid = await validateImageDimensions(imageUrl);
          if (!isValid) {
            alert('Image must be between 95x95px and 1000px in both dimensions');
            return;
          }

          // Set the image
          const preview = modal.querySelector('#create-image-preview');
          const placeholder = modal.querySelector('#create-image-placeholder');
          preview.src = imageUrl;
          preview.style.display = 'block';
          placeholder.style.display = 'none';
        });

        // Form validation
        const validateForm = () => {
          let isValid = true;

          // Validate title
          const title = titleInput.value.trim();
          const titleError = modal.querySelector('#create-title-error');
          if (!title) {
            titleError.textContent = 'Title is required';
            titleError.classList.add('visible');
            isValid = false;
          } else {
            titleError.textContent = '';
            titleError.classList.remove('visible');
          }

          // Validate prompt
          const prompt = promptTextarea.value.trim();
          const promptError = modal.querySelector('#create-prompt-error');
          if (!prompt) {
            promptError.textContent = 'Prompt content is required';
            promptError.classList.add('visible');
            isValid = false;
          } else {
            promptError.textContent = '';
            promptError.classList.remove('visible');
          }

          return isValid;
        };

        // Submit button
        submitBtn.addEventListener('click', async () => {
          if (!validateForm()) return;

          const title = titleInput.value.trim();
          const prompt = promptTextarea.value.trim();
          const imageUrl = modal.querySelector('#create-image-preview').src || null;

          // Disable button and show loading
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Creating...';

          try {
            // Get project ID from URL
            const pathname = window.location.pathname;
            const projectIdMatch = pathname.match(/\\/projects\\/(\\d+)/);
            const projectId = projectIdMatch ? projectIdMatch[1] : 'unknown';

            const cardData = {
              project_id: projectId,
              title: title,
              prompt: prompt,
              image_url: imageUrl,
              active: true
              // sort_order is auto-assigned by the API
            };

            const result = await window.electronAPI.createPromptCard(cardData);

            if (result.success) {
              submitBtn.textContent = 'Created!';
              submitBtn.style.backgroundColor = '#4CAF50';
              // Refresh the prompt cards list
              if (typeof loadPromptCards === 'function') {
                loadPromptCards();
              }

              // Close modal after success
              setTimeout(() => {
                modal.remove();
              }, 1500);
            } else {
              throw new Error(result.error || 'Failed to create prompt card');
            }
          } catch (error) {
            console.error('[Prompt] Failed to create prompt card:', error);
            submitBtn.textContent = 'Failed - Try Again';
            submitBtn.style.backgroundColor = '#f44336';
            submitBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
            }, 3000);
          }
        });
      };

      // Modal for editing prompt card
      const showEditPromptModal = (card) => {
        console.log("EditPromptModal requested to be shown=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
        // Remove existing modal if any
        const existingModal = document.querySelector('.prompt-modal-overlay');
        if (existingModal) existingModal.remove();

        const modalHTML = '<div class="prompt-modal-overlay">' +
          '<div class="prompt-modal">' +
            '<div class="prompt-modal-header">' +
              '<h2>Edit Prompt Card</h2>' +
              '<button class="prompt-modal-close" type="button">&times;</button>' +
            '</div>' +
            '<div class="prompt-modal-body">' +
              '<div class="easybot-form-group">' +
                '<label>Title</label>' +
                '<div class="easybot-input-wrapper">' +
                  '<input type="text" class="easybot-input" id="edit-title" placeholder="Enter prompt title" value="' + (card.title || '') + '">' +
                '</div>' +
                '<span class="easybot-error-message" id="edit-title-error"></span>' +
              '</div>' +
              '<div class="easybot-form-group">' +
                '<label>Prompt Content</label>' +
                '<div class="easybot-input-wrapper">' +
                  '<textarea class="easybot-textarea" id="edit-prompt" rows="4" placeholder="Enter your prompt content">' + (card.prompt || '') + '</textarea>' +
                '</div>' +
                '<span class="easybot-error-message" id="edit-prompt-error"></span>' +
              '</div>' +
              '<div class="custom-toggle-container">' +
                '<div class="custom-toggle-switch" data-checked="' + (card.active ? 'true' : 'false') + '">' +
                  '<input id="edit-active" type="checkbox" checked="' + (card.active ? 'true' : 'false') + '" />' +
                  '<div class="custom-toggle-track"></div>' +
                  '<div class="custom-toggle-thumb"></div>' +
                '</div>' +
                '<label class="custom-toggle-label">' +
                  '<p>Active</p>' +
                '</label>' +
              '</div>' +
              '<div class="easybot-form-group">' +
                '<label>Profile Image (Optional)</label>' +
                '<div class="image-upload-section d-flex flex-col gap-1">' +
                  '<div class="d-flex gap-1" style="padding-block: 10px;">' +
                    '<div class="current-image">' +
                    '<img id="edit-image-preview" src="' + (card.image_url || '') + '" alt="Current image" style="width: 80px; height: 80px; object-fit: cover; border: 2px solid #e0e0e0; display: none;">' +
                    '<div id="edit-image-placeholder" class="image-placeholder" style="width: 80px; height: 80px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">' +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>' +
                      '</svg>' +
                    '</div>' +
                  '</div>' +
                  '<div style="display: flex; align-items: center;">' +
                      '<button class="prompt-btn-secondary d-flex items-center gap-1" id="edit-choose-image" type="button">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">' +
                          '<path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>' +
                        '</svg>' +
                        'Choose from Unsplash' +
                      '</button>' +
                    '</div>' +
                  '</div>' +
                  '<div class="image-actions d-flex gap-1" style="display: flex; flex-direction: column; gap: 8px;">' +
                    '<div style="display: flex; align-items: center; gap: 8px;">' +
                      '<div class="easybot-input-wrapper" style="width: 100%;">' +
                        '<input type="url" class="easybot-input" id="edit-image-url" placeholder="Enter JPG/PNG URL (95x95px - 1000px max)" value="' + (card.image_url || '') + '">' +
                      '</div>' +
                      '<button data-v-7dee89f7="" type="button" class="v-btn v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-outlined" style="text-transform: none;" id="edit-load-url" style="width: 122px !important"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__content" data-no-activator=""> Load URL </span></button>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="prompt-modal-footer">' +
              '<button type="button" class="v-btn v-theme--CustomGPT bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat" style="text-transform: none" id="edit-submit">' +
                '<span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>'+
                '<span class="v-btn__content" data-no-activator=""> Save Changes </span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        console.log("EditPromptModal inserted in body=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");

        const modal = document.querySelector('.prompt-modal-overlay');
        const closeBtn = modal.querySelector('.prompt-modal-close');
        const submitBtn = modal.querySelector('#edit-submit');
        const titleInput = modal.querySelector('#edit-title');
        const promptTextarea = modal.querySelector('#edit-prompt');
        const activeCheckbox = modal.querySelector('#edit-active');
        const chooseImageBtn = modal.querySelector('#edit-choose-image');
        const loadUrlBtn = modal.querySelector('#edit-load-url');
        const imageUrlInput = modal.querySelector('#edit-image-url');

        // Initialize active checkbox state
        const activeToggleContainer = activeCheckbox.closest('.custom-toggle-switch');
        const isActive = card.active || false;

        activeToggleContainer.setAttribute('data-checked', isActive ? 'true' : 'false');
        activeCheckbox.checked = isActive;

        // Active checkbox event handling
        activeCheckbox.addEventListener('change', () => {
          const toggleContainer = activeCheckbox.parentNode;
          toggleContainer.setAttribute('data-checked', activeCheckbox.checked ? 'true' : 'false');
        });

        // Make track and label clickable to toggle checkbox
        const track = activeToggleContainer.querySelector('.custom-toggle-track');
        const label = activeToggleContainer.parentElement.querySelector('.custom-toggle-label');

        const toggleCheckbox = () => {
          activeCheckbox.checked = !activeCheckbox.checked;
          activeCheckbox.dispatchEvent(new Event('change'));
        };

        if (track) {
          track.addEventListener('click', toggleCheckbox);
        }

        if (label) {
          label.addEventListener('click', toggleCheckbox);
        }

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });

        // Close button
        closeBtn.addEventListener('click', () => modal.remove());

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Choose image button
        chooseImageBtn.addEventListener('click', () => {
          showImageSelectionModal((imageUrl) => {
            const preview = modal.querySelector('#edit-image-preview');
            const placeholder = modal.querySelector('#edit-image-placeholder');
            preview.src = imageUrl;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
            // Clear URL input when using Unsplash
            imageUrlInput.value = '';
          });
        });

        // Load URL button
        loadUrlBtn.addEventListener('click', async () => {
          const imageUrl = imageUrlInput.value.trim();
          if (!imageUrl) {
            alert('Please enter an image URL');
            return;
          }

          // Validate URL format
          if (!isValidImageUrl(imageUrl)) {
            alert('Please enter a valid JPG or PNG image URL');
            return;
          }

          // Test image loading and dimensions
          const isValid = await validateImageDimensions(imageUrl);
          if (!isValid) {
            alert('Image must be between 95x95px and 1000px in both dimensions');
            return;
          }

          // Set the image
          const preview = modal.querySelector('#edit-image-preview');
          const placeholder = modal.querySelector('#edit-image-placeholder');
          preview.src = imageUrl;
          preview.style.display = 'block';
          placeholder.style.display = 'none';
        });

        // Form validation
        const validateForm = () => {
          let isValid = true;

          // Validate title
          const title = titleInput.value.trim();
          const titleError = modal.querySelector('#edit-title-error');
          if (!title) {
            titleError.textContent = 'Title is required';
            titleError.classList.add('visible');
            isValid = false;
          } else {
            titleError.textContent = '';
            titleError.classList.remove('visible');
          }

          // Validate prompt
          const prompt = promptTextarea.value.trim();
          const promptError = modal.querySelector('#edit-prompt-error');
          if (!prompt) {
            promptError.textContent = 'Prompt content is required';
            promptError.classList.add('visible');
            isValid = false;
          } else {
            promptError.textContent = '';
            promptError.classList.remove('visible');
          }

          return isValid;
        };

        // Submit button
        submitBtn.addEventListener('click', async () => {
          if (!validateForm()) return;

          const title = titleInput.value.trim();
          const prompt = promptTextarea.value.trim();
          const active = activeCheckbox.checked;
          const imageUrl = modal.querySelector('#edit-image-preview').src || null;

          // Disable button and show loading
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Saving...';

          try {
            const updates = {
              title: title,
              prompt: prompt,
              active: active,
              image_url: imageUrl
            };
            // Note: sort_order cannot be updated via this modal - it's managed automatically

            const result = await window.electronAPI.updatePromptCard(card.id, updates);

            if (result.success) {
              submitBtn.textContent = 'Saved!';
              submitBtn.style.backgroundColor = '#4CAF50';

              // Refresh the prompt cards list
              if (typeof loadPromptCards === 'function') {
                loadPromptCards();
              }

              // Close modal after success
              setTimeout(() => {
                modal.remove();
              }, 1500);
            } else {
              throw new Error(result.error || 'Failed to update prompt card');
            }
          } catch (error) {
            console.error('[Prompt] Failed to update prompt card:', error);
            submitBtn.textContent = 'Failed - Try Again';
            submitBtn.style.backgroundColor = '#f44336';
            submitBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
            }, 3000);
          }
        });
      };

      // Modal for deleting prompt card
      const showDeletePromptModal = (card) => {
        // Remove existing modal if any
        const existingModal = document.querySelector('.prompt-modal-overlay');
        if (existingModal) existingModal.remove();

        const modalHTML = '<div class="prompt-modal-overlay">' +
          '<div class="prompt-modal">' +
            '<div class="prompt-modal-header">' +
              '<h2>Delete Prompt Card</h2>' +
              '<button class="prompt-modal-close" type="button">&times;</button>' +
            '</div>' +
            '<div class="prompt-modal-body">' +
              '<div class="delete-confirmation">' +
                '<h3 style="text-align: center; margin-bottom: 8px; color: #333;">Are you sure?</h3>' +
                '<p style="text-align: center; color: #666; margin-bottom: 16px;">' +
                  'This action cannot be undone. This will permanently delete the prompt card ' +
                '</p>' +
              '</div>' +
            '</div>' +
            '<div class="prompt-modal-footer">' +
              '<button class="prompt-btn-secondary" id="delete-cancel">Cancel</button>' +
              '<button class="prompt-btn-danger" id="delete-confirm">Delete Prompt Card</button>' +
            '</div>' +
          '</div>' +
        '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.prompt-modal-overlay');
        const closeBtn = modal.querySelector('.prompt-modal-close');
        const cancelBtn = modal.querySelector('#delete-cancel');
        const confirmBtn = modal.querySelector('#delete-confirm');

        // Close modal functions
        const closeModal = () => modal.remove();

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });

        // Close button
        closeBtn.addEventListener('click', closeModal);

        // Cancel button
        cancelBtn.addEventListener('click', closeModal);

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Confirm delete button
        confirmBtn.addEventListener('click', async () => {
          // Disable button and show loading
          confirmBtn.disabled = true;
          const originalText = confirmBtn.textContent;
          confirmBtn.textContent = 'Deleting...';

          try {
            const result = await window.electronAPI.deletePromptCard(card.id);

            if (result.success) {
              confirmBtn.textContent = 'Deleted!';
              confirmBtn.style.backgroundColor = '#4CAF50';

              // Refresh the prompt cards list
              if (typeof loadPromptCards === 'function') {
                loadPromptCards();
              }

              // Close modal after success
              setTimeout(() => {
                modal.remove();
              }, 1500);
            } else {
              throw new Error(result.error || 'Failed to delete prompt card');
            }
          } catch (error) {
            console.error('[Prompt] Failed to delete prompt card:', error);
            confirmBtn.textContent = 'Failed - Try Again';
            confirmBtn.style.backgroundColor = '#f44336';
            confirmBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
              confirmBtn.textContent = originalText;
              confirmBtn.style.backgroundColor = '';
            }, 3000);
          }
        });
      };

      // Modal for selecting images from Unsplash
      const showImageSelectionModal = (onImageSelected) => {
        // Remove existing modal if any
        const existingModal = document.querySelector('.image-modal-overlay');
        if (existingModal) existingModal.remove();

        const modalHTML = '<div class="image-modal-overlay">' +
          '<div class="image-modal">' +
            '<div class="image-modal-header">' +
              '<h2>Select Image from Unsplash</h2>' +
              '<button class="image-modal-close" type="button">&times;</button>' +
            '</div>' +
            '<div class="image-modal-body">' +
              '<div class="image-search-section" style="margin-bottom: 16px;">' +
                '<div style="display: flex; gap: 8px;">' +
                  '<input type="text" class="image-search-input" id="image-search-input" placeholder="Search for images..." style="flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px;">' +
                  '<button class="image-search-btn" id="image-search-btn" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Search</button>' +
                '</div>' +
              '</div>' +
              '<div class="images-loading" id="images-loading" style="text-align: center; padding: 20px; display: none;">' +
                '<div style="display: inline-block; width: 20px; height: 20px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>' +
                '<p style="margin-top: 10px; color: #666;">Loading images...</p>' +
              '</div>' +
              '<div class="images-grid" id="images-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; max-height: 400px; overflow-y: auto;">' +
                '<!-- Images will be loaded here -->' +
              '</div>' +
            '</div>' +
            '<div class="image-modal-footer">' +
              '<button class="image-btn-secondary" id="image-cancel">Cancel</button>' +
            '</div>' +
          '</div>' +
        '</div>';

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.image-modal-overlay');
        const closeBtn = modal.querySelector('.image-modal-close');
        const cancelBtn = modal.querySelector('#image-cancel');
        const searchInput = modal.querySelector('#image-search-input');
        const searchBtn = modal.querySelector('#image-search-btn');
        const imagesGrid = modal.querySelector('#images-grid');
        const loadingDiv = modal.querySelector('#images-loading');

        // Close modal functions
        const closeModal = () => modal.remove();

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });

        // Close button
        closeBtn.addEventListener('click', closeModal);

        // Cancel button
        cancelBtn.addEventListener('click', closeModal);

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Load initial random images
        loadRandomImages();

        // Search functionality
        const performSearch = async () => {
          const query = searchInput.value.trim();
          if (query) {
            await searchImages(query);
          } else {
            await loadRandomImages();
          }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            performSearch();
          }
        });

        // Load random images
        async function loadRandomImages() {
          loadingDiv.style.display = 'block';
          imagesGrid.innerHTML = '';

          try {
            const result = await window.electronAPI.getRandomUnsplashImages({ count: 20 });
            if (result.success && result.data) {
              displayImages(result.data);
            } else {
              imagesGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #666;">Failed to load images</div>';
            }
          } catch (error) {
            console.error('[Image Selection] Error loading random images:', error);
            imagesGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #666;">Error loading images</div>';
          } finally {
            loadingDiv.style.display = 'none';
          }
        }

        // Search images
        async function searchImages(query) {
          loadingDiv.style.display = 'block';
          imagesGrid.innerHTML = '';

          try {
            const result = await window.electronAPI.searchUnsplashImages({ query, page: 1, perPage: 20 });
            if (result.success && result.data && result.data.results) {
              displayImages(result.data.results);
            } else {
              imagesGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #666;">No images found</div>';
            }
          } catch (error) {
            console.error('[Image Selection] Error searching images:', error);
            imagesGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #666;">Error searching images</div>';
          } finally {
            loadingDiv.style.display = 'none';
          }
        }

        // Display images in grid
        function displayImages(images) {
          imagesGrid.innerHTML = '';

          images.forEach(image => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-item';
            imageDiv.style.cssText = 'cursor: pointer; border-radius: 8px; overflow: hidden; aspect-ratio: 1; background: #f5f5f5; border: 2px solid transparent; transition: border-color 0.2s;';
            imageDiv.setAttribute('data-url', image.urls.small);

            imageDiv.innerHTML = '<img src="' + image.urls.thumb + '" alt="' + (image.alt_description || 'Unsplash image') + '" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">';

            // Hover effects
            imageDiv.addEventListener('mouseenter', () => {
              imageDiv.style.borderColor = '#007bff';
            });

            imageDiv.addEventListener('mouseleave', () => {
              imageDiv.style.borderColor = 'transparent';
            });

            // Selection
            imageDiv.addEventListener('click', () => {
              if (typeof onImageSelected === 'function') {
                onImageSelected(image.urls.small);
              }
              closeModal();
            });

            imagesGrid.appendChild(imageDiv);
          });
        }
      };

      // Show custom SharePoint modal
      const showSharepointModal = () => {
        // Remove existing modal if any
        const existingModal = document.querySelector('.easybot-modal-overlay');
        if (existingModal) existingModal.remove();

        // Extract projectId from URL
        const pathname = window.location.pathname;
        const projectIdMatch = pathname.match(/\\/projects\\/(\\d+)/);
        const projectId = projectIdMatch ? projectIdMatch[1] : 'UNKNOWN';
        
        const guestEmail = 'system+' + projectId + '@easybot.chat';
        const message = 'Please create a Guest Account for "' + guestEmail + '" with access to the folders/files you would like to add.';

        const modalHTML = \`
          <div class="easybot-modal-overlay">
            <div class="easybot-modal">
              <div class="easybot-modal-header">
                <h2>Add Sharepoint</h2>
                <button class="easybot-modal-close" type="button">&times;</button>
              </div>
              <div class="easybot-modal-body">
                <p class="easybot-sharepoint-message">\${message}</p>
              </div>
              <div class="easybot-modal-footer">
                <button class="easybot-submit-btn" id="easybot-sharepoint-submit">Submit</button>
              </div>
            </div>
          </div>
        \`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.easybot-modal-overlay');
        const closeBtn = modal.querySelector('.easybot-modal-close');
        const submitBtn = modal.querySelector('#easybot-sharepoint-submit');

        // Close modal on overlay click
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });

        // Close button
        closeBtn.addEventListener('click', () => modal.remove());

        // Escape key to close
        const escHandler = (e) => {
          if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
          }
        };
        document.addEventListener('keydown', escHandler);

        // Submit button - send email via SendGrid to system+{projectId}@easybot.chat
        submitBtn.addEventListener('click', async () => {
          // Disable button and show loading
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';

          try {
            // Check if electronAPI is available
            if (window.electronAPI && window.electronAPI.sendSharepointEmail) {
              const result = await window.electronAPI.sendSharepointEmail({
                projectId: projectId
              });

              if (result.success) {
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                console.log('[EasyBot] SharePoint email sent to:', guestEmail);
                
                // Close modal after success
                setTimeout(() => {
                  modal.remove();
                }, 1500);
              } else {
                throw new Error(result.error || 'Failed to send email');
              }
            } else {
              // Fallback: just log (for non-Electron environments)
              console.log('[EasyBot] SharePoint request:', { projectId, guestEmail, message });
              submitBtn.textContent = 'Submitted!';
              setTimeout(() => modal.remove(), 1000);
            }
          } catch (error) {
            console.error('[EasyBot] Failed to send SharePoint email:', error);
            submitBtn.textContent = 'Failed - Try Again';
            submitBtn.style.backgroundColor = '#f44336';
            submitBtn.disabled = false;

            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
            }, 3000);
          }
        });
      };

      // On /projects/{projectID}/pages/{pageID}/metadata, hide specific metadata property card
      const hideMetadataPropertyCard = () => {
        try {
          const { pathname } = window.location;
          // Check if we're on a metadata page: /projects/{projectID}/pages/{pageID}/metadata
          if (!pathname.includes('/pages/') || !pathname.includes('/metadata')) return;
          
          // Hide the first div inside the v-container on metadata page
          const containerFirstChild = document.querySelector('.v-container.v-locale--is-ltr.py-0.my-6 > .v-card.v-theme--CustomGPT.v-card--density-default.v-card--variant-elevated.mb-3');
          if (containerFirstChild && !processedElements.has(containerFirstChild)) {
            containerFirstChild.style.setProperty('display', 'none', 'important');
            processedElements.add(containerFirstChild);
          }
          
          // Find the parent container first
          const parentCard = document.querySelectorAll('.v-card.v-theme--CustomGPT.v-card--density-default.v-card--variant-elevated.mb-3');
          if (!parentCard) return;
          
          const cardText = Array.from(parentCard)[1].querySelector('.v-card-text');
          if (!cardText) return;
          
          // Find the second child that matches the metadata property class
          const metadataProperties = cardText.querySelectorAll('.metadata-property.mb-3.bg-light');
          if (metadataProperties.length >= 2) {
            const targetElement = metadataProperties[1]; // Second element (index 1)
            if (targetElement && !processedElements.has(targetElement)) {
              targetElement.style.setProperty('display', 'none', 'important');
              processedElements.add(targetElement);
            }
          }
        } catch (error) {
          console.error('[EasyBot] Error in hideMetadataPropertyCard:', error);
        }
      };

      // Hide overflow hidden rounded element
      const hideOverflowRoundedElement = () => {
        try {
          const elements = document.querySelectorAll('.overflow-hidden.rounded-3xl.bg-white.text-center');
          elements.forEach(element => {
            if (!processedElements.has(element)) {
              element.style.setProperty('display', 'none', 'important');
              element.style.setProperty('visibility', 'hidden', 'important');
              element.style.setProperty('opacity', '0', 'important');
              element.style.setProperty('pointer-events', 'none', 'important');
              processedElements.add(element);
            }
          });
        } catch (error) {
          console.error('[EasyBot] Error in hideOverflowRoundedElement:', error);
        }
      };

      // Hide widget that keeps reappearing (cookie consent or similar)
      const hideReappearingWidget = () => {
        try {
          // Hide spans with cc-1qbp0 and cc-1o31k classes
          const widgetSpans = document.querySelectorAll('span.cc-1qbp0.cc-1o31k');
          const widgetSpans2 = document.querySelectorAll('.cgptcb-chat-bubble.visible');
          
          widgetSpans.forEach(span => {
            if (!processedElements.has(span)) {
              span.style.setProperty('display', 'none', 'important');
              span.style.setProperty('visibility', 'hidden', 'important');
              span.style.setProperty('opacity', '0', 'important');
              span.style.setProperty('pointer-events', 'none', 'important');
              processedElements.add(span);
            }
          });
          widgetSpans2.forEach(span => {
            if (!processedElements.has(span)) {
              span.style.setProperty('display', 'none', 'important');
              span.style.setProperty('visibility', 'hidden', 'important');
              span.style.setProperty('opacity', '0', 'important');
              span.style.setProperty('pointer-events', 'none', 'important');
              processedElements.add(span);
            }
          });

          // Hide elements matching the deeper selector
          const widgetContainers = document.querySelectorAll('.cc-yv368 .cc-1kr6o .cc-18ov6 .cc-1qbp0');
          widgetContainers.forEach(container => {
            if (!processedElements.has(container)) {
              container.style.setProperty('display', 'none', 'important');
              container.style.setProperty('visibility', 'hidden', 'important');
              container.style.setProperty('opacity', '0', 'important');
              container.style.setProperty('pointer-events', 'none', 'important');
              processedElements.add(container);
            }
          });

          // Also hide any parent containers with these classes
          const parentContainers = document.querySelectorAll('.cc-yv368, .cc-1kr6o, .cc-18ov6');
          parentContainers.forEach(parent => {
            if (!processedElements.has(parent)) {
              parent.style.setProperty('display', 'none', 'important');
              parent.style.setProperty('visibility', 'hidden', 'important');
              parent.style.setProperty('opacity', '0', 'important');
              parent.style.setProperty('pointer-events', 'none', 'important');
              processedElements.add(parent);
            }
          });
        } catch (error) {
          console.error('[EasyBot] Error in hideReappearingWidget:', error);
        }
      };

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = '__sso_overlay__';
    overlay.innerHTML = '<div class="spinner"></div>';

    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: '#ffffff',
      zIndex: '999999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

    const style = document.createElement('style');

    document.head.appendChild(style);
    document.body.appendChild(overlay);
  }

  let once = false;

  function redirectToOkta() {
    window.location.replace('https://trial-2230464.okta.com/');
  }

  function isLoginPage() {
    return location.hostname === 'app.customgpt.ai' && location.pathname.includes('/login');
  }

  function isOnProjectRoute() {
    return location.hostname === 'app.customgpt.ai' && location.pathname.includes('/projects/');
  }

  async function hideLoginPage() {
    console.log('DOMContentLoaded......................)', isLoginPage());
    if (!isLoginPage()) once = false;
    if (!isLoginPage() || once) return;
    once = true;
    console.log('createOverlay......................)', isLoginPage());
    createOverlay();
    await window.electronAPI.fullLogout();
    setTimeout(() => {
      redirectToOkta();
    }, 2000);
  }

      // Global functions for prompt cards management

      // Validate if URL is a JPG or PNG image
      function isValidImageUrl(url) {
        try {
          const urlObj = new URL(url);
          const pathname = urlObj.pathname.toLowerCase();
          return pathname.endsWith('.jpg') || pathname.endsWith('.jpeg') || pathname.endsWith('.png');
        } catch {
          return false;
        }
      }

      // Validate image dimensions (95x95px min, 1000px max)
      async function validateImageDimensions(url) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const { naturalWidth, naturalHeight } = img;
            // Check if dimensions are between 95x95 and 1000x1000
            const isValid = naturalWidth >= 95 && naturalHeight >= 95 &&
                           naturalWidth <= 1000 && naturalHeight <= 1000;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = url;
        });
      }

      async function loadPromptCards(page = 1) {
        const loadingState = document.getElementById('loading-state');
        const loadingStateContainer = document.getElementById('loading-state-container');
        const promptCardsList = document.getElementById('prompt-cards-list');
        const emptyState = document.getElementById('empty-state');

        // Show loading state and hide other content
        loadingState.style.display = 'flex';
        loadingStateContainer.style.display = 'grid';
        promptCardsList.style.display = 'none !important';
        emptyState.style.display = 'none !important';
        loadingState.classList.remove('hide-loader');
        loadingStateContainer.classList.remove('hide-loader');

        try {
          console.log('[Chat Interface] Loading page:', page, 'with limit:', pageSize);
          const projectId = window.location.pathname.split('/')[2];
          const result = await getPromptCards({ page, project_id: projectId });
          console.log('[Chat Interface] API result:', result);

          // hide loading state
          loadingState.style.display = 'none !important';
          loadingState.classList.add('hide-loader');
          loadingStateContainer.classList.add('hide-loader');

          if (result.success && result.data && result.data.length > 0) {
            currentPage = page;
            console.log('[Chat Interface] Rendering cards for page', page, ':', result.data);
            renderPromptCards(result.data);
            renderPagination(result.pagination);
            promptCardsList.style.display = 'block';
          } else {
            console.log('[Chat Interface] No data or error, showing empty state');
            emptyState.style.display = 'block';
          }
        } catch (error) {
          console.error('[Chat Interface] Error loading prompt cards:', error);
          // show error state and hide loading state
          loadingState.style.display = 'none !important';
          loadingState.classList.add('hide-loader');
          emptyState.style.display = 'block';
          loadingStateContainer.classList.add('hide-loader');
        }
      }

      // Global variables for drag and drop and pagination
      let draggedItem = null;
      let currentPage = 1;
      const pageSize = 10;

      // Wrapper function to ensure getPromptCards always includes page and limit
      function getPromptCards(options = {}) {
        const { page = currentPage, limit = pageSize } = options;
        const projectId = window.location.pathname.split('/')[2];
        return window.electronAPI.getPromptCards({ page, limit, project_id: projectId });
      }

      // Function to render pagination controls
      function renderPagination(pagination) {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) return;

        const { page, totalPages, hasNext, hasPrev, total } = pagination;

        // Hide pagination if only one page
        if (totalPages <= 1) {
          paginationContainer.style.display = 'none';
          return;
        }

        paginationContainer.style.display = 'block';

        let paginationHTML = '<div class="pagination-controls d-flex align-center justify-center gap-2 my-4">';

        // Previous button
        if (hasPrev) {
          paginationHTML += '<button class="v-btn v-btn--elevated v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated pagination-btn" data-page="' + (page - 1) + '"><span class="v-btn__overlay"></span><span class="v-btn__content">&laquo; Previous</span></button>';
        } else {
          paginationHTML += '<button class="v-btn v-btn--flat v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text pagination-btn" disabled><span class="v-btn__overlay"></span><span class="v-btn__content">&laquo; Previous</span></button>';
        }

        // Page info
        paginationHTML += '<span class="pagination-info text-body-2 mx-4">Page ' + page + ' of ' + totalPages + ' (' + total + ' total)</span>';

        // Next button
        if (hasNext) {
          paginationHTML += '<button class="v-btn v-btn--elevated v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated pagination-btn" data-page="' + (page + 1) + '"><span class="v-btn__overlay"></span><span class="v-btn__content">Next &raquo;</span></button>';
        } else {
          paginationHTML += '<button class="v-btn v-btn--flat v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text pagination-btn" disabled><span class="v-btn__overlay"></span><span class="v-btn__content">Next &raquo;</span></button>';
        }

        paginationHTML += '</div>';

        paginationContainer.innerHTML = paginationHTML;

        // Add event listeners to pagination buttons
        const paginationButtons = paginationContainer.querySelectorAll('.pagination-btn:not([disabled])');
        console.log('[Chat Interface] Adding pagination event listeners to', paginationButtons.length, 'buttons');
        paginationButtons.forEach(btn => {
          // Remove any existing click listeners to avoid duplicates
          btn.removeEventListener('click', handlePaginationClick);
          btn.addEventListener('click', handlePaginationClick);
        });
      }

      // Pagination click handler
      function handlePaginationClick(e) {
        const targetPage = parseInt(e.currentTarget.getAttribute('data-page'));
        console.log('[Chat Interface] Pagination button clicked, navigating to page:', targetPage);
        if (targetPage) {
          loadPromptCards(targetPage);
        }
      }

      // Function to render prompt cards
      function renderPromptCards(cards) {
        const promptCardsList = document.getElementById('prompt-cards-list');
        console.log('[Chat Interface] Clearing prompt cards list and rendering', cards.length, 'cards');
        promptCardsList.innerHTML = '';

        cards.forEach(card => {
          console.log('[Chat Interface] Rendering card:', card.id, card.title);
          const cardElement = createPromptCardElement(card);
          promptCardsList.appendChild(cardElement);
        });

        console.log('[Chat Interface] Cards rendered, list now has', promptCardsList.children.length, 'children');

        // Add drag and drop functionality
        setupDragAndDrop();
      }

      // Function to setup drag and drop functionality
      function setupDragAndDrop() {
        const list = document.getElementById('prompt-cards-list');

        // Remove existing event listeners to avoid duplicates
        list.removeEventListener('dragstart', handleDragStart);
        list.removeEventListener('dragend', handleDragEnd);
        list.removeEventListener('dragover', handleDragOver);

        // Add event listeners
        list.addEventListener('dragstart', handleDragStart);
        list.addEventListener('dragend', handleDragEnd);
        list.addEventListener('dragover', handleDragOver);
      }

      // Drag event handlers
      function handleDragStart(e) {
        draggedItem = e.target;
        e.target.classList.add('dragging');
      }

      async function handleDragEnd(e) {
        e.target.classList.remove('dragging');

        // Update sort orders after drag operation completes
        await updateSortOrdersAfterDrag();

        draggedItem = null;
      }

      function handleDragOver(e) {
        e.preventDefault(); // Allow drop
        const list = document.getElementById('prompt-cards-list');
        const afterElement = getDragAfterElement(list, e.clientY);
        if (afterElement == null) {
          list.appendChild(draggedItem);
        } else {
          list.insertBefore(draggedItem, afterElement);
        }
      }

      // Function to update sort orders after drag operation
      async function updateSortOrdersAfterDrag() {
        try {
          const list = document.getElementById('prompt-cards-list');
          const cards = list.querySelectorAll('li.prompt-card');

          // Calculate base sort order for current page (page 1 = 1-10, page 2 = 11-20, etc.)
          const baseSortOrder = (currentPage - 1) * pageSize + 1;

          console.log('[Chat Interface] Updating sort orders after drag - page:', currentPage, 'baseSortOrder:', baseSortOrder);

          // Update sort order for each card in the new visual order
          const updatePromises = Array.from(cards).map(async (cardElement, index) => {
            const cardId = cardElement.getAttribute('data-card-id');
            const newSortOrder = baseSortOrder + index;

            console.log('[Chat Interface] Updating card', cardId, 'to sort_order:', newSortOrder);

            try {
              const result = await window.electronAPI.updatePromptCard(cardId, { sort_order: newSortOrder });
              if (!result.success) {
                console.error('[Chat Interface] Failed to update sort order for card', cardId, ':', result.error);
              }
            } catch (error) {
              console.error('[Chat Interface] Error updating sort order for card', cardId, ':', error);
            }
          });

          // Wait for all updates to complete
          await Promise.all(updatePromises);
          console.log('[Chat Interface] Sort order updates completed');

        } catch (error) {
          console.error('[Chat Interface] Error updating sort orders after drag:', error);
        }
      }

      // Helper function to get the element to insert before during drag
      function getDragAfterElement(container, y) {
        const draggableElements = [
          ...container.querySelectorAll('li:not(.dragging)'),
        ];

        return draggableElements.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
            } else {
              return closest;
            }
          },
          { offset: Number.NEGATIVE_INFINITY }
        ).element;
      }

      // Function to create a prompt card element
      function createPromptCardElement(card) {
        const cardDiv = document.createElement('li');
        cardDiv.className = 'prompt-card';
        cardDiv.setAttribute('data-card-id', card.id);
        cardDiv.setAttribute('draggable', 'true');

        cardDiv.innerHTML =
          '<div class="v-card__header d-flex align-center p-3">' +
            '<div class="d-flex align-center flex-grow-1">' +
              '<img src="' + (card.image_url || '/default-avatar.png') + '" alt="Profile" class="card-avatar mr-3" style="width: 48px; height: 48px; object-fit: cover;">' +
              '<div class="flex-grow-1">' +
                '<div class="v-card__title prompt-card-title">' + (card.title || 'Untitled') + '</div>' +
                '<div class="v-card__subtitle prompt-card-subtitle">' +
                  '<p class="text-body-1 mb-0">' + (card.prompt || 'No prompt content') + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="v-card__actions">' +
              '<span class="active-status ' + (card.active ? 'text-success' : 'text-error') + '">' +
                (card.active ? 'Active' : 'Inactive') +
              '</span>' +
              '<button class="v-btn v-btn--icon v-theme--CustomGPT v-btn--density-default v-btn--size-small v-btn--variant-text card-menu-btn" data-card-id="' + card.id + '">' +
                '<span class="v-btn__overlay"></span>' +
                '<span class="v-btn__content">' +
                  '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                    '<path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path>' +
                  '</svg>' +
                '</span>' +
              '</button>' +
            '</div>' +
          '</div>';

        return cardDiv;
      }

      // Customize sidebar menu
      const customizeSidebar = () => {
        // 1. Hide Dashboard button
        const dashboardLink = document.querySelector('a.link[href="https://app.customgpt.ai/"]');
        if (dashboardLink) {
          const dashboardText = dashboardLink.querySelector('p.sideitem-paragraph');
          if (dashboardText && dashboardText.textContent.trim() === 'Dashboard') {
            dashboardLink.style.display = 'none';
          }
        }
        
        // 2. Hide Notifications button
        const notificationsBadge = document.querySelector('div.v-badge');
        if (notificationsBadge) {
          const notificationsText = notificationsBadge.querySelector('p.sideitem-paragraph');
          if (notificationsText && notificationsText.textContent.trim() === 'Notifications') {
            notificationsBadge.style.display = 'none';
          }
        }
        
        // 3. Rename "Agents" to "Bots" (keep original route)
        const agentsLinks = document.querySelectorAll('a.link[href*="/projects"]');
        agentsLinks.forEach(agentsLink => {
          if (processedElements.has(agentsLink)) return;
          const agentsText = agentsLink.querySelector('p.sideitem-paragraph');
          if (agentsText) {
            const text = agentsText.textContent.trim();
            if (text === 'Agents' || text.includes('Agents') || text === 'Bots') {
              agentsText.textContent = 'Bots';
              // Also update innerHTML if needed
              if (agentsText.innerHTML) {
                agentsText.innerHTML = agentsText.innerHTML.replace(/Agents/g, 'Bots');
              }
              // Keep original route - don't change href
              processedElements.add(agentsLink);
            }
          }
        });
        
        // Alternative: find by text content (just rename, keep route)
        const allParagraphs = document.querySelectorAll('p.sideitem-paragraph');
        allParagraphs.forEach(p => {
          if (processedElements.has(p)) return;
          if (p.textContent.trim() === 'Agents' || p.textContent.trim() === 'Bots') {
            p.textContent = 'Bots';
            if (p.innerHTML) {
              p.innerHTML = p.innerHTML.replace(/Agents/g, 'Bots');
            }
            processedElements.add(p);
          }
        });
        
        // 4. Rename "Resources" to "Get Help" and change href
        const resourcesLink = document.querySelector('a.link[href="https://app.customgpt.ai/dashboard/resources"]');
        if (resourcesLink && !processedElements.has(resourcesLink)) {
          const resourcesText = resourcesLink.querySelector('p.sideitem-paragraph');
          if (resourcesText && resourcesText.textContent.trim() === 'Resources') {
            resourcesText.textContent = 'Get Help';
            resourcesLink.href = 'mailto:support@easybot.chat';
            resourcesLink.setAttribute('href', 'mailto:support@easybot.chat');
            
            // Override click to prevent React/Vue routing (only add once)
            if (!resourcesLink.dataset.clickHandlerAdded) {
              resourcesLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'mailto:support@easybot.chat';
              }, true);
              resourcesLink.dataset.clickHandlerAdded = 'true';
            }
            processedElements.add(resourcesLink);
          }
        }
        
        // 5. Rename "Slack Community" to "Book Consultation" and change href
        const slackLink = document.querySelector('a.link[href="https://customgpt.ai/slack"]');
        if (slackLink) {
          const slackText = slackLink.querySelector('p.sideitem-paragraph');
          if (slackText && slackText.textContent.trim() === 'Slack Community') {
            slackText.textContent = 'Book Consultation';
            slackLink.href = 'https://tidycal.com/1v7dxy1/easybotchat-meeting';
            slackLink.setAttribute('href', 'https://tidycal.com/1v7dxy1/easybotchat-meeting');
          }
        }
        
        // 6. Hide Developers link
        const developersLinks = document.querySelectorAll('a.link[href*="/profile#api"], a.link[href*="profile#api"]');
        developersLinks.forEach(developersLink => {
          if (processedElements.has(developersLink)) return;
          const developersText = developersLink.querySelector('span.font-semibold');
          if (developersText && developersText.textContent.trim() === 'Developers') {
            developersLink.style.display = 'none';
            processedElements.add(developersLink);
          }
        });
        
        // Alternative: find by text "Developers" in all links
        const allLinks = document.querySelectorAll('a.link');
        allLinks.forEach(link => {
          if (processedElements.has(link)) return;
          const developersSpan = link.querySelector('span.font-semibold.text-black, span.font-semibold');
          if (developersSpan && developersSpan.textContent.trim() === 'Developers') {
            link.style.display = 'none';
            processedElements.add(link);
          }
        });
        
        // Also check for button with "Developers" text (inside link or standalone)
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
          if (processedElements.has(button)) return;
          const developersSpan = button.querySelector('span.font-semibold.text-black, span.font-semibold');
          if (developersSpan && developersSpan.textContent.trim() === 'Developers') {
            const parentLink = button.closest('a.link');
            if (parentLink && !processedElements.has(parentLink)) {
              // Hide parent link if it exists
              parentLink.style.display = 'none';
              processedElements.add(parentLink);
            } else {
              // Hide the button itself if no parent link
              button.style.display = 'none';
              processedElements.add(button);
            }
          }
        });
        
        // Also check for buttons with specific classes that contain "Developers"
        const developerButtons = document.querySelectorAll('button.v-btn.text-secondary.mt-4');
        developerButtons.forEach(button => {
          if (processedElements.has(button)) return;
          const developersSpan = button.querySelector('span.font-semibold.text-black');
          if (developersSpan && developersSpan.textContent.trim() === 'Developers') {
            button.style.display = 'none';
            processedElements.add(button);
          }
        });
        
        // 7. Hide "New Agent" button section
        const newAgentButtons = document.querySelectorAll('button.new-agent-button, button[class*="new-agent-button"]');
        newAgentButtons.forEach(button => {
          if (processedElements.has(button)) return;
          const parentLink = button.closest('a.link');
          const parentDiv = button.closest('div.pt-6');
          
          // Hide the parent div (which contains the button and hr)
          if (parentDiv) {
            parentDiv.style.display = 'none';
            processedElements.add(parentDiv);
          } else if (parentLink) {
            // Fallback: hide just the link
            parentLink.style.display = 'none';
            processedElements.add(parentLink);
          } else {
            // Last resort: hide the button itself
            button.style.display = 'none';
            processedElements.add(button);
          }
        });
        
        // Alternative: find by href and text
        const createAgentLinks = document.querySelectorAll('a.link[href*="/projects/create"]');
        createAgentLinks.forEach(link => {
          if (processedElements.has(link)) return;
          const agentText = link.querySelector('span.agent-text, button span');
          if (agentText && (agentText.textContent.trim() === 'New Agent' || agentText.textContent.includes('New Agent'))) {
            const parentDiv = link.closest('div.pt-6');
            if (parentDiv) {
              parentDiv.style.display = 'none';
              processedElements.add(parentDiv);
            } else {
              link.style.display = 'none';
              processedElements.add(link);
            }
          }
        });
        
        // 8. Rename "Build" to "Knowledge base"
        const buildParagraphs = document.querySelectorAll('p.sideitem-paragraph');
        buildParagraphs.forEach(p => {
          if (processedElements.has(p)) return;
          if (p.textContent.trim() === 'Build') {
            p.textContent = 'Knowledge base';
            if (p.innerHTML) {
              p.innerHTML = p.innerHTML.replace(/Build/g, 'Knowledge base');
            }
            processedElements.add(p);
          }
        });
        
        // 9. Adding "Chat interface" to the sidebar (only once)
        if (!document.querySelector('.sideitem-paragraph[chat-interface-added]') && isOnProjectRoute()) {
          const chatInterfaceParagraphs = document.querySelectorAll('p.sideitem-paragraph');
          chatInterfaceParagraphs.forEach(p => {
            if ((p.textContent.trim() === 'Build' || p.textContent.trim() === 'Knowledge base') && !p.hasAttribute('chat-interface-added')) {
              const el = document.createElement('a');
              el.classList.add('link', 'cursor-pointer', 'w-full');

              el.innerHTML = '<button data-v-08981316="" data-v-961eb836="" type="button" class="v-btn v-btn--block v-btn--slim v-theme--CustomGPT text-dark v-btn--density-default v-btn--size-default v-btn--variant-text btn-sidebar justify-start overflow-hidden ps-0.5 chat-interface-btn" style="text-transform: none;"><span class="v-btn__overlay"></span><span class="v-btn__underlay"></span><span class="v-btn__prepend"><svg data-v-7fa85f8e="" data-v-08981316="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" tag="i" class="iconify iconify--tabler v-icon notranslate v-theme--CustomGPT v-icon--size-default text-dark change-path-stroke ms-8 transition-all duration-300"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 21h6m-3 0V3L3 9h18M9 3l10 6"></path><path d="M17 9v4a2 2 0 1 1-2 2"></path></g></svg></span><span class="v-btn__content" data-no-activator=""><p data-v-08981316="" class="font-normal text-dark sideitem-paragraph ms-2 font-semibold">Chat Interface</p></span><span class="v-btn__append"></span><!----></button>';

              p.parentNode.parentNode.parentNode.insertAdjacentElement('afterend', el);
              p.setAttribute('chat-interface-added', 'true');

              // Add click handler for Chat Interface
              el.addEventListener('click', (e) => {
                try {
                  e.preventDefault();
                  e.stopPropagation();

                  // Hide the content element
                  const contentElement = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar > div.content.relative.max-h-full');
                  if (contentElement) {
                    contentElement.style.display = 'none';
                  }

                  // Add new HTML content to the container
                  const container = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar');
                  if (container) {
                    // Clear existing content and add new HTML
                    container.innerHTML =
                      '<div class="chat-interface-content">' +
                        '<div class="d-flex justify-space-between align-center mb-4">' +
                          '<h2 class="text-h4 mb-0">Chat Interface</h2>' +
                          '<button type="button" class="v-btn v-theme--CustomGPT bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat add-prompt-btn" style="text-transform: none">' +
                            '<span class="v-btn__overlay"></span><span class="v-btn__underlay"></span>'+
                            '<span class="v-btn__content" data-no-activator=""> Add New Prompt </span>' +
                          '</button>' +
                        '</div>' +
                        '<div class="prompt-cards-container">' +
                          '<div class="loading-state-container" id="loading-state-container">' +
                            '<div class="loading-state" id="loading-state">' +
                              '<div class="v-progress-circular v-theme--CustomGPT v-progress-circular--indeterminate v-progress-circular--visible" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 40px; height: 40px;">' +
                                '<svg class="v-progress-circular__svg" viewBox="21.904761904761905 21.904761904761905 43.80952380952381 43.80952380952381">' +
                                  '<circle class="v-progress-circular__circle" cx="43.80952380952381" cy="43.80952380952381" r="20" fill="transparent" stroke="currentColor" stroke-width="3.8095238095238093" stroke-linecap="round"></circle>' +
                                '</svg>' +
                              '</div>' +
                              '<span class="ml-3">Loading prompt cards...</span>' +
                            '</div>' +
                          '</div>' +
                          '<ul class="prompt-cards-list bg-white rounded-card v-card--variant-elevated shadow-card my-4" id="prompt-cards-list" style="display: none;">' +
                            '<!-- Prompt cards will be inserted here -->' +
                          '</ul>' +
                          '<div class="empty-state text-center py-8" id="empty-state" style="display: none;">' +
                            '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-large mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                              '<path d="M9,7H11V9H9V7M9,11H11V17H9V11M5,4.5C5,3.12 6.12,2 7.5,2H16.5C17.88,2 19,3.12 19,4.5V19.5C19,20.88 17.88,22 16.5,22H7.5C6.12,22 5,20.88 5,19.5V4.5M7.5,4A.5.5 0 0,0 7,4.5V19.5A.5.5 0 0,0 7.5,20H16.5A.5.5 0 0,0 17,19.5V4.5A.5.5 0 0,0 16.5,4H7.5Z"></path>' +
                            '</svg>' +
                            '<h3 class="text-h6 mb-2">No prompt cards yet</h3>' +
                            '<p class="text-body-2 mb-4">Create your first prompt card to get started with the chat interface.</p>' +
                            '<button class="v-btn v-btn--elevated v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated">' +
                              '<span class="v-btn__overlay"></span>' +
                              '<span class="v-btn__content">Create First Prompt</span>' +
                            '</button>' +
                          '</div>' +
                          '<div class="pagination-container" id="pagination-container" style="display: none;"></div>' +
                        '</div>' +
                      '</div>'

                      '<!-- Edit Prompt Dialog -->' +
                      '<div class="v-overlay v-overlay--active v-theme--CustomGPT v-locale--is-ltr v-overlay--scroll-blocked edit-dialog-overlay" id="edit-dialog-overlay" style="display: none; z-index: 2000;">' +
                        '<div class="v-overlay__scrim" style="opacity: 0.32;"></div>' +
                        '<div class="v-overlay__content">' +
                          '<div class="v-card v-theme--CustomGPT v-card--density-default rounded-card v-card--variant-elevated shadow-card" style="max-width: 600px; width: 100%;">' +
                            '<div class="v-card__header">' +
                              '<div class="v-card__title">Edit Prompt Card</div>' +
                              '<div class="v-card__close">' +
                                '<button class="v-btn v-btn--icon v-theme--CustomGPT v-btn--density-default v-btn--size-small v-btn--variant-text close-edit-dialog">' +
                                  '<span class="v-btn__overlay"></span>' +
                                  '<span class="v-btn__content">' +
                                    '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                      '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>' +
                                    '</svg>' +
                                  '</span>' +
                                '</button>' +
                              '</div>' +
                            '</div>' +
                            '<div class="v-card__text">' +
                              '<div class="mb-4">' +
                                '<label class="v-label v-field-label text-body-2 mb-2 d-block">Profile Image</label>' +
                                '<div class="d-flex align-center">' +
                                  '<div class="profile-image-container mr-4" style="position: relative; display: inline-block;">' +
                                    '<img id="edit-profile-image" src="" alt="Profile" class="profile-image" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #e0e0e0;">' +
                                    '<button class="edit-image-btn v-btn v-btn--icon v-theme--CustomGPT v-btn--density-default v-btn--size-small v-btn--variant-elevated" style="position: absolute; bottom: 0; right: 0;">' +
                                      '<span class="v-btn__overlay"></span>' +
                                      '<span class="v-btn__content">' +
                                        '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                          '<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>' +
                                        '</svg>' +
                                      '</span>' +
                                    '</button>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                              '<div class="mb-4">' +
                                '<label class="v-label v-field-label text-body-2 mb-2 d-block">Title</label>' +
                                '<div class="v-field v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--CustomGPT">' +
                                  '<div class="v-field__overlay"></div>' +
                                  '<div class="v-field__control">' +
                                    '<input id="edit-title" type="text" class="v-field__input" placeholder="Enter prompt title">' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                              '<div class="mb-4">' +
                                '<label class="v-label v-field-label text-body-2 mb-2 d-block">Prompt</label>' +
                                '<div class="v-field v-field--appended v-field--center-affix v-field--dirty v-field--variant-outlined v-theme--CustomGPT">' +
                                  '<div class="v-field__overlay"></div>' +
                                  '<div class="v-field__control">' +
                                    '<textarea id="edit-prompt" class="v-field__input" rows="4" placeholder="Enter your prompt content"></textarea>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                            '</div>' +
                            '<div class="v-card__actions">' +
                              '<button class="v-btn v-btn--flat v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text cancel-edit-btn">' +
                                '<span class="v-btn__overlay"></span>' +
                                '<span class="v-btn__content">Cancel</span>' +
                              '</button>' +
                              '<button class="v-btn v-btn--elevated v-theme--CustomGPT text-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated save-edit-btn">' +
                                '<span class="v-btn__overlay"></span>' +
                                '<span class="v-btn__content">Save Changes</span>' +
                              '</button>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>'

                      '<!-- Delete Confirmation Dialog -->' +
                      '<div class="v-overlay v-overlay--active v-theme--CustomGPT v-locale--is-ltr v-overlay--scroll-blocked delete-dialog-overlay" id="delete-dialog-overlay" style="display: none; z-index: 2000;">' +
                        '<div class="v-overlay__scrim" style="opacity: 0.32;"></div>' +
                        '<div class="v-overlay__content">' +
                          '<div class="v-card v-theme--CustomGPT v-card--density-default rounded-card v-card--variant-elevated shadow-card" style="max-width: 400px; width: 100%;">' +
                            '<div class="v-card__header">' +
                              '<div class="v-card__title">Delete Prompt Card</div>' +
                            '</div>' +
                            '<div class="v-card__text">' +
                              '<p>Are you sure you want to delete this prompt card? This action cannot be undone.</p>' +
                            '</div>' +
                            '<div class="v-card__actions">' +
                              '<button class="v-btn v-btn--flat v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text cancel-delete-btn">' +
                                '<span class="v-btn__overlay"></span>' +
                                '<span class="v-btn__content">Cancel</span>' +
                              '</button>' +
                              '<button class="v-btn v-btn--elevated v-theme--CustomGPT error v-btn--density-default v-btn--size-default v-btn--variant-elevated confirm-delete-btn">' +
                                '<span class="v-btn__overlay"></span>' +
                                '<span class="v-btn__content">Delete</span>' +
                              '</button>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>'

                      '<!-- Unsplash Image Selector Dialog -->' +
                      '<div class="v-overlay v-overlay--active v-theme--CustomGPT v-locale--is-ltr v-overlay--scroll-blocked image-dialog-overlay" id="image-dialog-overlay" style="display: none; z-index: 2000;">' +
                        '<div class="v-overlay__scrim" style="opacity: 0.32;"></div>' +
                        '<div class="v-overlay__content">' +
                          '<div class="v-card v-theme--CustomGPT v-card--density-default rounded-card v-card--variant-elevated shadow-card" style="max-width: 800px; width: 100%; max-height: 80vh;">' +
                            '<div class="v-card__header">' +
                              '<div class="v-card__title">Select Image</div>' +
                              '<div class="v-card__close">' +
                                '<button class="v-btn v-btn--icon v-theme--CustomGPT v-btn--density-default v-btn--size-small v-btn--variant-text close-image-dialog">' +
                                  '<span class="v-btn__overlay"></span>' +
                                  '<span class="v-btn__content">' +
                                    '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                      '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>' +
                                    '</svg>' +
                                  '</span>' +
                                '</button>' +
                              '</div>' +
                            '</div>' +
                            '<div class="v-card__text">' +
                              '<div class="mb-4">' +
                                '<div class="v-field v-field--appended v-field--center-affix v-field--variant-outlined v-theme--CustomGPT">' +
                                  '<div class="v-field__overlay"></div>' +
                                  '<div class="v-field__control">' +
                                    '<input id="image-search" type="text" class="v-field__input" placeholder="Search for images...">' +
                                    '<div class="v-field__append-inner">' +
                                      '<button class="v-btn v-btn--icon v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text search-images-btn">' +
                                        '<span class="v-btn__overlay"></span>' +
                                        '<span class="v-btn__content">' +
                                          '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                            '<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>' +
                                          '</svg>' +
                                        '</span>' +
                                      '</button>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                              '<div class="images-grid" id="images-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; max-height: 400px; overflow-y: auto;">' +
                                '<!-- Images will be loaded here -->' +
                              '</div>' +
                            '</div>' +
                            '<div class="v-card__actions">' +
                              '<button class="v-btn v-btn--flat v-theme--CustomGPT v-btn--density-default v-btn--size-default v-btn--variant-text cancel-image-btn">' +
                                '<span class="v-btn__overlay"></span>' +
                                '<span class="v-btn__content">Cancel</span>' +
                              '</button>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>';

                    // Initialize the chat interface
                    initializeChatInterface();

                    // Function to initialize chat interface
                    function initializeChatInterface() {
                      loadPromptCards();

                      // Add event listeners
                      setupChatInterfaceEventListeners();
                    }


                    // Function to setup event listeners
                    function setupChatInterfaceEventListeners() {
                      // Add new prompt button
                      const addBtn = document.querySelector('.add-prompt-btn');
                      if (addBtn) {
                        addBtn.addEventListener('click', () => {
                          showCreatePromptModal();
                        });
                      }

                      // Empty state create button
                      const emptyCreateBtn = document.querySelector('#empty-state .v-btn');
                      if (emptyCreateBtn) {
                        emptyCreateBtn.addEventListener('click', () => {
                          showEditDialog(null);
                        });
                      }

                      // Delegate event listeners for dynamically created elements
                      document.addEventListener('click', (e) => {
                        // Card menu button
                        if (e.target.closest('.card-menu-btn')) {
                          const cardId = e.target.closest('.card-menu-btn').getAttribute('data-card-id');
                          showCardMenu(cardId, e.target.closest('.card-menu-btn'));
                        }

                        // Edit dialog buttons
                        if (e.target.closest('.close-edit-dialog') || e.target.closest('.cancel-edit-btn')) {
                          hideEditDialog();
                        }
                        if (e.target.closest('.save-edit-btn')) {
                          savePromptCard();
                        }
                        if (e.target.closest('.edit-image-btn')) {
                          showImageDialog();
                        }

                        // Delete dialog buttons
                        if (e.target.closest('.cancel-delete-btn')) {
                          hideDeleteDialog();
                        }
                        if (e.target.closest('.confirm-delete-btn')) {
                          confirmDeletePromptCard();
                        }

                        // Image dialog buttons
                        if (e.target.closest('.close-image-dialog') || e.target.closest('.cancel-image-btn')) {
                          hideImageDialog();
                        }
                        if (e.target.closest('.search-images-btn')) {
                          searchUnsplashImages();
                        }
                      });

                      // Handle image selection
                      document.addEventListener('click', (e) => {
                        if (e.target.closest('.unsplash-image')) {
                          const imageUrl = e.target.closest('.unsplash-image').getAttribute('data-url');
                          selectUnsplashImage(imageUrl);
                        }
                      });

                      // Handle enter key in search input
                      document.addEventListener('keypress', (e) => {
                        if (e.target.id === 'image-search' && e.key === 'Enter') {
                          searchUnsplashImages();
                        }
                      });
                    }

                    // Function to show card menu
                    function showCardMenu(cardId, buttonElement) {
                      // Remove any existing menus
                      document.querySelectorAll('.card-menu-dropdown').forEach(menu => menu.remove());

                      const menuDiv = document.createElement('div');
                      menuDiv.className = 'card-menu-dropdown v-menu__content v-theme--CustomGPT v-overlay__content';
                      menuDiv.style.cssText = 'position: absolute; z-index: 1000; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 120px;';

                      menuDiv.innerHTML =
                        '<div class="v-list v-theme--CustomGPT">' +
                          '<div class="v-list-item v-list-item--density-default v-theme--CustomGPT edit-card-item" id="edit-card-item" data-card-id="' + cardId + '">' +
                            '<div class="v-list-item__prepend">' +
                              '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                '<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>' +
                              '</svg>' +
                            '</div>' +
                            '<div class="v-list-item__content">' +
                              '<div class="v-list-item-title cursor-pointer">Edit</div>' +
                            '</div>' +
                          '</div>' +
                          '<div class="v-list-item v-list-item--density-default v-theme--CustomGPT delete-card-item" id="delete-card-item" data-card-id="' + cardId + '">' +
                            '<div class="v-list-item__prepend">' +
                              '<svg class="v-icon notranslate v-theme--CustomGPT v-icon--size-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true">' +
                                '<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>' +
                              '</svg>' +
                            '</div>' +
                            '<div class="v-list-item__content">' +
                              '<div class="v-list-item-title cursor-pointer">Delete</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>';

                      // Position the menu
                      const rect = buttonElement.getBoundingClientRect();
                      menuDiv.style.top = (rect.bottom + 4) + 'px';
                      menuDiv.style.left = (rect.left - 80) + 'px';

                      document.body.appendChild(menuDiv);

                      // Add click handlers for menu items
                      document.getElementById('edit-card-item').addEventListener('click', async () => {
                        const loadingState = document.getElementById('loading-state');
                        const loadingStateContainer = document.getElementById('loading-state-container');
                        const promptCardsList = document.getElementById('prompt-cards-list');
                        const emptyState = document.getElementById('empty-state');

                        // Show loading state
                        loadingState.style.display = 'flex';
                        loadingStateContainer.style.display = 'grid';
                        promptCardsList.style.display = 'none !important';
                        emptyState.style.display = 'none !important';
                        loadingState.classList.remove('hide-loader');
                        loadingStateContainer.classList.remove('hide-loader');

                        try {
                          const projectId = window.location.pathname.split('/')[2];
                          const result = await getPromptCards({ page: currentPage, limit: pageSize, project_id: projectId });

                          // Hide loading state
                          loadingState.style.display = 'none !important';
                          loadingState.classList.add('hide-loader');
                          loadingStateContainer.classList.add('hide-loader');

                          if (result.success) {
                            const card = result.data.find(c => c.id === cardId);
                            if (card) {
                              showEditPromptModal(card);
                            }
                          }
                        } catch (error) {
                          console.error('[Chat Interface] Error loading card for edit:', error);
                          // Hide loading state on error
                          loadingState.style.display = 'none !important';
                          loadingState.classList.add('hide-loader');
                          loadingStateContainer.classList.add('hide-loader');
                        }
                        menuDiv.remove();
                      });

                      document.getElementById('delete-card-item').addEventListener('click', async () => {
                        const loadingState = document.getElementById('loading-state');
                        const loadingStateContainer = document.getElementById('loading-state-container');
                        const promptCardsList = document.getElementById('prompt-cards-list');
                        const emptyState = document.getElementById('empty-state');

                        // Show loading state
                        loadingState.style.display = 'flex';
                        loadingStateContainer.style.display = 'grid';
                        promptCardsList.style.display = 'none !important';
                        emptyState.style.display = 'none !important';
                        loadingState.classList.remove('hide-loader');
                        loadingStateContainer.classList.remove('hide-loader');

                        // Get card data for deletion confirmation
                        try {
                          const projectId = window.location.pathname.split('/')[2];
                          const result = await getPromptCards({ page: currentPage, limit: pageSize, project_id: projectId });

                          // Hide loading state
                          loadingState.style.display = 'none !important';
                          loadingState.classList.add('hide-loader');
                          loadingStateContainer.classList.add('hide-loader');

                          if (result.success) {
                            const card = result.data.find(c => c.id === cardId);
                            if (card) {
                              showDeletePromptModal(card);
                            }
                          }
                        } catch (error) {
                          console.error('[Chat Interface] Error loading card for delete:', error);
                          // Hide loading state on error
                          loadingState.style.display = 'none !important';
                          loadingState.classList.add('hide-loader');
                          loadingStateContainer.classList.add('hide-loader');
                        }
                        menuDiv.remove();
                      });

                      // Close menu when clicking outside
                      setTimeout(() => {
                        document.addEventListener('click', function closeMenu(e) {
                          if (!menuDiv.contains(e.target) && !buttonElement.contains(e.target)) {
                            menuDiv.remove();
                            document.removeEventListener('click', closeMenu);
                          }
                        });
                      }, 0);
                    }

                    // Function to show edit dialog
                    async function showEditDialog(cardId) {
                      const dialog = document.getElementById('edit-dialog-overlay');
                      const titleInput = document.getElementById('edit-title');
                      const promptTextarea = document.getElementById('edit-prompt');
                      const profileImage = document.getElementById('edit-profile-image');

                      // Reset form
                      titleInput.value = '';
                      promptTextarea.value = '';
                      profileImage.src = '';

                      if (cardId) {
                        // Edit existing card
                        try {
                          const projectId = window.location.pathname.split('/')[2];
                          const result = await getPromptCards({ page: currentPage, limit: pageSize, project_id: projectId });
                          if (result.success) {
                            const card = result.data.find(c => c.id === cardId);
                            if (card) {
                              titleInput.value = card.title || '';
                              promptTextarea.value = card.prompt || '';
                              profileImage.src = card.image_url || '';
                              dialog.setAttribute('data-card-id', cardId);
                            }
                          }
                        } catch (error) {
                          console.error('[Chat Interface] Error loading card for edit:', error);
                        }
                      } else {
                        // New card
                        dialog.removeAttribute('data-card-id');
                      }

                      dialog.style.display = 'block';
                    }

                    // Function to hide edit dialog
                    function hideEditDialog() {
                      const dialog = document.getElementById('edit-dialog-overlay');
                      dialog.style.display = 'none';
                    }

                    // Function to save prompt card
                    async function savePromptCard() {
                      const dialog = document.getElementById('edit-dialog-overlay');
                      const cardId = dialog.getAttribute('data-card-id');
                      const titleInput = document.getElementById('edit-title');
                      const promptTextarea = document.getElementById('edit-prompt');
                      const profileImage = document.getElementById('edit-profile-image');

                      const cardData = {
                        title: titleInput.value.trim(),
                        prompt: promptTextarea.value.trim(),
                        image_url: profileImage.src || null,
                        active: true
                        // sort_order is auto-assigned by the API
                      };

                      try {
                        let result;
                        if (cardId) {
                          // Update existing
                          result = await window.electronAPI.updatePromptCard(cardId, cardData);
                        } else {
                          // Create new - extract project ID from URL
                          const pathname = window.location.pathname;
                          const projectIdMatch = pathname.match(/\\/projects\\/(\\d+)/);
                          const projectId = projectIdMatch ? projectIdMatch[1] : 'unknown';

                          cardData.project_id = projectId;
                          result = await window.electronAPI.createPromptCard(cardData);
                        }

                        if (result.success) {
                          hideEditDialog();
                          // Refresh the prompt cards list
                          if (typeof loadPromptCards === 'function') {
                            loadPromptCards();
                          }
                        } else {
                          console.error('[Chat Interface] Error saving prompt card:', result.error);
                          alert('Error saving prompt card: ' + result.error);
                        }
                      } catch (error) {
                        console.error('[Chat Interface] Error saving prompt card:', error);
                        alert('Error saving prompt card: ' + error.message);
                      }
                    }

                    // Function to show delete dialog
                    function showDeleteDialog(cardId) {
                      const dialog = document.getElementById('delete-dialog-overlay');
                      dialog.setAttribute('data-card-id', cardId);
                      dialog.style.display = 'block';
                    }

                    // Function to hide delete dialog
                    function hideDeleteDialog() {
                      const dialog = document.getElementById('delete-dialog-overlay');
                      dialog.style.display = 'none';
                    }

                    // Function to confirm delete
                    async function confirmDeletePromptCard() {
                      const dialog = document.getElementById('delete-dialog-overlay');
                      const cardId = dialog.getAttribute('data-card-id');

                      try {
                        const result = await window.electronAPI.deletePromptCard(cardId);
                        if (result.success) {
                          hideDeleteDialog();
                          // Refresh the prompt cards list
                          if (typeof loadPromptCards === 'function') {
                            loadPromptCards();
                          }
                        } else {
                          console.error('[Chat Interface] Error deleting prompt card:', result.error);
                          alert('Error deleting prompt card: ' + result.error);
                        }
                      } catch (error) {
                        console.error('[Chat Interface] Error deleting prompt card:', error);
                        alert('Error deleting prompt card: ' + error.message);
                      }
                    }

                    // Function to show image dialog
                    async function showImageDialog() {
                      const dialog = document.getElementById('image-dialog-overlay');
                      const imagesGrid = document.getElementById('images-grid');

                      // Load random images initially
                      imagesGrid.innerHTML = '<div class="d-flex justify-center py-4"><div class="v-progress-circular v-theme--CustomGPT v-progress-circular--indeterminate v-progress-circular--visible" style="width: 32px; height: 32px;"></div></div>';

                      try {
                        const result = await window.electronAPI.getRandomUnsplashImages({ count: 20 });
                        if (result.success) {
                          renderUnsplashImages(result.data);
                        } else {
                          imagesGrid.innerHTML = '<div class="text-center py-4 text-error">Failed to load images</div>';
                        }
                      } catch (error) {
                        console.error('[Chat Interface] Error loading random images:', error);
                        imagesGrid.innerHTML = '<div class="text-center py-4 text-error">Error loading images</div>';
                      }

                      dialog.style.display = 'block';
                    }

                    // Function to hide image dialog
                    function hideImageDialog() {
                      const dialog = document.getElementById('image-dialog-overlay');
                      dialog.style.display = 'none';
                    }

                    // Function to search Unsplash images
                    async function searchUnsplashImages() {
                      const searchInput = document.getElementById('image-search');
                      const query = searchInput.value.trim();
                      const imagesGrid = document.getElementById('images-grid');

                      if (!query) {
                        showImageDialog(); // Load random images
                        return;
                      }

                      imagesGrid.innerHTML = '<div class="d-flex justify-center py-4"><div class="v-progress-circular v-theme--CustomGPT v-progress-circular--indeterminate v-progress-circular--visible" style="width: 32px; height: 32px;"></div></div>';

                      try {
                        const result = await window.electronAPI.searchUnsplashImages({ query, page: 1, perPage: 20 });
                        if (result.success && result.data.results) {
                          renderUnsplashImages(result.data.results);
                        } else {
                          imagesGrid.innerHTML = '<div class="text-center py-4 text-error">No images found</div>';
                        }
                      } catch (error) {
                        console.error('[Chat Interface] Error searching images:', error);
                        imagesGrid.innerHTML = '<div class="text-center py-4 text-error">Error searching images</div>';
                      }
                    }

                    // Function to render Unsplash images
                    function renderUnsplashImages(images) {
                      const imagesGrid = document.getElementById('images-grid');
                      imagesGrid.innerHTML = '';

                      images.forEach(image => {
                        const imageDiv = document.createElement('div');
                        imageDiv.className = 'unsplash-image';
                        imageDiv.setAttribute('data-url', image.urls.small);
                        imageDiv.style.cssText = 'cursor: pointer; border-radius: 8px; overflow: hidden; aspect-ratio: 1; background: #f5f5f5;';

                        imageDiv.innerHTML = '<img src="' + image.urls.thumb + '" alt="' + (image.alt_description || 'Unsplash image') + '" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">';

                        imagesGrid.appendChild(imageDiv);
                      });
                    }

                    // Function to select Unsplash image
                    function selectUnsplashImage(imageUrl) {
                      const profileImage = document.getElementById('edit-profile-image');
                      profileImage.src = imageUrl;
                      hideImageDialog();
                    }
                  }

                  // Manage active state for sidebar buttons
                  manageSidebarActiveState('chat-interface');
                } catch (error) {
                  console.log('[EasyBot] Error handling Chat Interface click:', error.message);
                }
              });
            }
          });
        }
      };
      
      // Throttle function to prevent excessive calls
      let throttleTimer = null;
      const throttledApply = () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          setPageTitle();
          applySVGStyles();
          hideLogoLink();
          customizeSidebar();
          hideCopilot();
          hideProfileTabsOnProfileRoute();
          hidePersonalizeRouteElements();
          hideAskRouteElements();
          hideAnalyzeRouteElements();
          hideCustomerIntelligenceRouteElements();
          hideShareAgentButton();
          hideMetadataPropertyCard();
          hideReappearingWidget();
          hideOverflowRoundedElement();
          customizeBuildSourcesPage();
          hideLoginPage();
          throttleTimer = null;
        }, 100);
      };
      
      // Watch for new elements and apply styles (throttled)
      const observer = new MutationObserver(() => {
       throttledApply();
      });
      
      // Intercept image loads to catch logo images as they load
      const originalImageSrcSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').set;
      Object.defineProperty(HTMLImageElement.prototype, 'src', {
        set: function(value) {
          if (value && (value.includes('logo.svg') || value.includes('assets.customgpt.ai/assets/imgs/logos/logo.svg'))) {
            const newLogoUrl = 'https://www.easybot.chat/s/EasyBotChat-long.png';
            originalImageSrcSetter.call(this, newLogoUrl + '?t=' + Date.now());
            return;
          }
          originalImageSrcSetter.call(this, value);
        },
        get: function() {
          return this.getAttribute('src') || '';
        },
        configurable: true
      });

      // Set page title to EasyBotChat on all pages
      const setPageTitle = () => {
        if (document.title !== 'EasyBotChat') {
          document.title = 'EasyBotChat';
        }
      };

      // Apply all customizations immediately
      setPageTitle();
      hideCopilot();
      hideLogoLink();
      customizeSidebar();
      restoreSidebarState();
      hideProfileTabsOnProfileRoute();
      hidePersonalizeRouteElements();
      hideAskRouteElements();
      hideAnalyzeRouteElements();
      hideCustomerIntelligenceRouteElements();
      hideShareAgentButton();
      hideMetadataPropertyCard();
      hideReappearingWidget();
      hideOverflowRoundedElement();
      hideLoginPage();
      customizeBuildSourcesPage();
      
      // Also run logo replacement after a delay to catch late-loading images
      setTimeout(() => hideLogoLink(), 1000);
      setTimeout(() => hideLogoLink(), 2000);
      setTimeout(() => hideLogoLink(), 3000);
      
      // Aggressively hide reappearing elements and maintain title every 2 seconds
      setInterval(() => {
        setPageTitle();
        hideReappearingWidget();
        hideOverflowRoundedElement();
      }, 2000);
      
      // Function to manage sidebar active states
      function manageSidebarActiveState(activeType) {
        try {
          if(!isOnProjectRoute()) return;
          // Save to localStorage
          localStorage.setItem('easybot-last-sidebar-click', activeType);

          // Remove bg-primary-100 from all sidebar buttons
          const allButtons = document.querySelectorAll('.btn-sidebar');
          allButtons.forEach(btn => {
            btn.classList.remove('bg-primary-100');
          });

          // Add bg-primary-100 to the active button
          if (activeType === 'chat-interface') {
            const chatInterfaceBtn = document.querySelector('.chat-interface-btn');
            if (chatInterfaceBtn) {
              chatInterfaceBtn.classList.add('bg-primary-100');
            }
          }
          // For other buttons, the CustomGPT app will handle it naturally
        } catch (error) {
          console.log('[EasyBot] Error managing sidebar active state:', error.message);
        }
      }

      // Function to restore sidebar state from localStorage
      function restoreSidebarState() {
        try {
          if(!isOnProjectRoute()) return;
          const lastClicked = localStorage.getItem('easybot-last-sidebar-click');
          if (lastClicked === 'chat-interface') {
            // Show chat interface UI
            const contentElement = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar > div.content.relative.max-h-full');
            if (contentElement) {
              contentElement.style.display = 'none';
            }

            const container = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar');
            if (container) {
              container.innerHTML =
                '<div class="chat-interface-content" style="padding: 20px;"><h2>Chat Interface</h2><p>This is the chat interface content.</p>'+

                    '<!-- Custom Card HTML -->' +
                    '<div class="v-card v-theme--CustomGPT v-card--density-comfortable rounded-card v-card--variant-elevated shadow-card my-4 mb-8">' +
                  '<div class="v-card__loader">' +
                    '<div class="v-progress-linear v-theme--CustomGPT v-locale--is-ltr" role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100" style="top: 0px; height: 0px; --v-progress-linear-height: 2px">' +
                      '<div class="v-progress-linear__background"></div>' +
                      '<div class="v-progress-linear__buffer" style="width: 0%"></div>' +
                      '<div class="v-progress-linear__indeterminate">' +
                        '<div class="v-progress-linear__indeterminate long"></div>' +
                        '<div class="v-progress-linear__indeterminate short"></div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="v-card-text">Add your custom HTML content here</div>' +
                  '<span class="v-card__underlay"></span>' +
                '</div>';
                    '</div>';
            }

            // Set active state
            manageSidebarActiveState('chat-interface');
          }
        } catch (error) {
          console.log('[EasyBot] Error restoring sidebar state:', error.message);
        }
      }

      // Add click handlers to other sidebar links to manage active state
      function setupSidebarClickHandlers() {
        if(!isOnProjectRoute()) return;
        // Build/Sources link
        const buildLink = document.querySelector('a[href*="build/sources"]');
        if (buildLink && !buildLink.dataset.sidebarHandlerAdded) {
          buildLink.dataset.sidebarHandlerAdded = 'true';
          buildLink.addEventListener('click', () => {
            // Save to localStorage
            localStorage.setItem('easybot-last-sidebar-click', 'build-sources');
            manageSidebarActiveState('build-sources');

            // show the content element
            const contentElement = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar > div.content.relative.max-h-full');
            if (contentElement) {
              contentElement.style.display = 'flex !important';
            }

            // Hide the HTML content container
            const container = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar');
            if (container) {
              container.style.display = 'none !important';
            }
            
            // Remove bg-primary-100 from chat interface
            const chatInterfaceBtn = document.querySelector('.chat-interface-btn');
            if (chatInterfaceBtn) {
              chatInterfaceBtn.classList.remove('bg-primary-100');
            }
          });
        }

        // Analyze link
        const analyzeLink = document.querySelector('a[href*="analyze"]');
        if (analyzeLink && !analyzeLink.dataset.sidebarHandlerAdded) {
          analyzeLink.dataset.sidebarHandlerAdded = 'true';
          analyzeLink.addEventListener('click', () => {
            // Save to localStorage
            localStorage.setItem('easybot-last-sidebar-click', 'analyze');
            manageSidebarActiveState('analyze');
            // show the content element
            const contentElement = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar > div.content.relative.max-h-full');
            if (contentElement) {
              contentElement.style.display = 'flex !important';
            }

            // Hide the HTML content container
            const container = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar');
            if (container) {
              container.style.display = 'none !important';
            }
            // Remove bg-primary-100 from chat interface
            const chatInterfaceBtn = document.querySelector('.chat-interface-btn');
            if (chatInterfaceBtn) {
              chatInterfaceBtn.classList.remove('bg-primary-100');
            }
          });
        }

        // Ask link
        const askLink = document.querySelector('a[href*="ask"]');
        if (askLink && !askLink.dataset.sidebarHandlerAdded) {
          askLink.dataset.sidebarHandlerAdded = 'true';
          askLink.addEventListener('click', () => {
            // Save to localStorage
            localStorage.setItem('easybot-last-sidebar-click', 'ask');
            manageSidebarActiveState('ask');
            // show the content element
            const contentElement = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar > div.content.relative.max-h-full');
            if (contentElement) {
              contentElement.style.display = 'flex !important';
            }

            // Hide the HTML content container
            const container = document.querySelector('.v-container.v-locale--is-ltr.py-0.flex.flex-col.gap-4.container-no-announcement-bar');
            if (container) {
              container.style.display = 'none !important';
            }
            // Remove bg-primary-100 from chat interface
            const chatInterfaceBtn = document.querySelector('.chat-interface-btn');
            if (chatInterfaceBtn) {
              chatInterfaceBtn.classList.remove('bg-primary-100');
            }
          });
        }
      }
      
      // Wait for body to be ready before observing
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
        setupSidebarClickHandlers();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
          setupSidebarClickHandlers();
        });
      }
      
      // Remove initial loading overlay once customizations are ready
      function hideInitialLoader() {
        const loader = document.getElementById('__easybot_loading__');
        if (loader) {
          loader.style.transition = 'opacity 0.2s ease';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.remove();
            document.body.style.visibility = 'visible';
          }, 200);
        }
      }
      
      // Hide loader after a short delay to ensure DOM updates are applied
      setTimeout(hideInitialLoader, 100);
    
    })();
  `
};

module.exports = customizations;

