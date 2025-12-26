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
    .easybot-input {
      flex: 1;
      border: none;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
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

    a[href="https://app.customgpt.ai/projects/86565/personalize"] {
      display: none !important;
    }

    div.v-overlay__content > div.text-center.flex-column.flex.gap-2.p-4 > button.v-btn.v-theme--CustomGPT.text-primary.v-btn--density-default.v-btn--size-default.v-btn--variant-tonal {
      display: none !important;
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
      
      // Wait for body to be ready before observing
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
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

