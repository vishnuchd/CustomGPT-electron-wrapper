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
  `,

  // JavaScript customizations
  js: `
    (function() {
      // Prevent duplicate execution
      if (window.customGPTWrapperApplied) return;
      window.customGPTWrapperApplied = true;
      
      // Add your JavaScript customizations here
      console.log('Applying custom UI modifications...');
      
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
            console.log('[EasyBot] Logo replaced:', img);
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
        console.log('[EasyBot] Current route:', url);
        return url;
      };

      // Redirect /projects/{id}/build/sources -> /projects/{id}/build/documents
      const redirectBuildSourcesToDocuments = () => {
        const { href, pathname, search, hash, origin } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/build/sources')) return;

        const targetPath = pathname.replace('/build/sources', '/build/documents');
        const targetUrl = origin + targetPath + search + hash;

        if (href !== targetUrl) {
          console.log('[EasyBot] Redirecting from sources to documents:', targetUrl);
          window.location.replace(targetUrl);
        }
      };

      // On /projects/{id}/build/documents, hide the first tab in the bottom tabs bar
      const hideSourcesTabOnDocumentsPage = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/build/documents')) return;

        const firstTab = document.querySelector('.flex.relative.w-100.mt-auto > .tabs-parent.mt-6.flex.flex-nowrap.overflow-x-hidden.underlined > div:first-child');
        if (!firstTab || processedElements.has(firstTab)) return;

        console.log('[EasyBot] Hiding first build tab on documents page:', firstTab);
        firstTab.style.setProperty('display', 'none', 'important');
        processedElements.add(firstTab);
      };

      // Hide profile page extra tabs on /profile route
      const hideProfileTabsOnProfileRoute = () => {
        const currentRoute = getCurrentRoute();
        console.log("currentRoute------------------------------", currentRoute);
        if (!currentRoute.startsWith('https://app.customgpt.ai/profile')) return;

        // Hide profile page extra tabs
        const tabs = document.querySelectorAll('.tabs-parent.flex-wrap.gap-2.mt-6.flex > div:not(:first-child)');
        console.log("tabs------------------------------", tabs);
        tabs.forEach(tab => {
          console.log("tab------------------------------", tab);
          if (processedElements.has(tab)) return;
          tab.style.setProperty('display', 'none', 'important');
          processedElements.add(tab);
        });

        // Hide email from profile form
        const fieldContainers = document.querySelectorAll('.v-form.mt-2 > .v-row > div:not(:first-child)');
        console.log("fieldContainers------------------------------", fieldContainers);
        fieldContainers.forEach(fieldContainer => {
          console.log("fieldContainer------------------------------", fieldContainer);
          if (processedElements.has(fieldContainer)) return;
          fieldContainer.style.setProperty('display', 'none', 'important');
          processedElements.add(fieldContainer);
        });

        // Hide profile page extra sections
        const sections = document.querySelectorAll('.v-window__container > .v-row > div:not(:first-child)');
        console.log("sections------------------------------", sections);
        sections.forEach(section => {
          console.log("section------------------------------", section);
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
          'Recaptcha'
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
      };

      // On /projects/{id}/analyze, hide export buttons and specific tabs
      const hideAnalyzeRouteElements = () => {
        const { pathname } = window.location;
        if (!pathname.includes('/projects/') || !pathname.endsWith('/analyze')) return;

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
            resourcesLink.href = 'https://www.easybot.chat/app-help';
            resourcesLink.setAttribute('href', 'https://www.easybot.chat/app-help');
            
            // Override click to prevent React/Vue routing (only add once)
            if (!resourcesLink.dataset.clickHandlerAdded) {
              resourcesLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'https://www.easybot.chat/app-help';
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
            slackLink.href = 'https://tidycal.com/client-meeting';
            slackLink.setAttribute('href', 'https://tidycal.com/client-meeting');
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
      };
      
      // Throttle function to prevent excessive calls
      let throttleTimer = null;
      const throttledApply = () => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          redirectBuildSourcesToDocuments();
          hideSourcesTabOnDocumentsPage();
          applySVGStyles();
          hideLogoLink();
          customizeSidebar();
          hideCopilot();
          hideProfileTabsOnProfileRoute();
          hidePersonalizeRouteElements();
          hideAskRouteElements();
          hideAnalyzeRouteElements();
          hideCustomerIntelligenceRouteElements();
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
            console.log('[EasyBot] Intercepted logo image load, replaced with:', newLogoUrl);
            return;
          }
          originalImageSrcSetter.call(this, value);
        },
        get: function() {
          return this.getAttribute('src') || '';
        },
        configurable: true
      });

      // Apply all customizations immediately
      redirectBuildSourcesToDocuments();
      hideCopilot();
      hideLogoLink();
      customizeSidebar();
      hideSourcesTabOnDocumentsPage();
      hideProfileTabsOnProfileRoute();
      hidePersonalizeRouteElements();
      hideAskRouteElements();
      hideAnalyzeRouteElements();
      hideCustomerIntelligenceRouteElements();
      
      // Also run logo replacement after a delay to catch late-loading images
      setTimeout(() => hideLogoLink(), 1000);
      setTimeout(() => hideLogoLink(), 2000);
      setTimeout(() => hideLogoLink(), 3000);
      
      // Wait for body to be ready before observing
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
        });
      }
      
     
    
    })();
  `
};

module.exports = customizations;

