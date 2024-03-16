import React, { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        "composerPlaceholder": "Chat with bot",
        "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
        "botId": "8e047356-251b-4ad2-98a5-1a44356629ce",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "messagingUrl": "https://messaging.botpress.cloud",
        "clientId": "8e047356-251b-4ad2-98a5-1a44356629ce",
        "webhookId": "75ef31e2-f321-48a8-a95f-1541b396ebe7",
        "lazySocket": true,
        "themeName": "prism",
        "frontendVersion": "v1",
        "showPoweredBy": true,
        "theme": "prism",
        "themeColor": "#2563eb"
      });
    };

    // Clean up function
    return () => {
      // Remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="webchat" style={{ height: '150px' }}></div>
  );
};

export default BotpressChat;
