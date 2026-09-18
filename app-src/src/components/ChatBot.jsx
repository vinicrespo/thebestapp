import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, ArrowLeft, Send } from 'lucide-react';

const FAQ_TREE = {
  root: {
    message: "Hi! 👋 I'm your AlkaLean assistant. How can I help you today?",
    options: [
      { label: "About the Protocol", next: "protocol" },
      { label: "Ingredients & Shopping", next: "shopping" },
      { label: "Health & Safety", next: "health" },
      { label: "Results & Expectations", next: "results" },
      { label: "App & Technical", next: "app_tech" },
      { label: "Guarantee & Refund", next: "guarantee" },
    ]
  },
  protocol: {
    message: "Great! What would you like to know about the protocol?",
    options: [
      { label: "What is the baking soda shot?", next: "answer_shot" },
      { label: "When should I take it?", next: "answer_when" },
      { label: "Can I adjust the recipe?", next: "answer_adjust" },
      { label: "What if I miss a day?", next: "answer_miss" },
      { label: "Do I need to diet too?", next: "answer_diet" },
      { label: "Do I need to exercise?", next: "answer_exercise" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_shot: {
    message: "The AlkaLean shot is a simple daily drink made with natural ingredients like baking soda, lemon, and other gut-supporting elements. Each day has a unique recipe designed to progressively reset your digestive system and support your metabolism. It takes less than 2 minutes to prepare!",
    options: [
      { label: "When should I take it?", next: "answer_when" },
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_when: {
    message: "For best results, take your daily shot first thing in the morning on an empty stomach — about 20 minutes before breakfast. This gives your body time to absorb the active ingredients before food enters your digestive system.",
    options: [
      { label: "What if I forget in the morning?", next: "answer_miss" },
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_adjust: {
    message: "Absolutely! The recipes are guidelines, not rigid rules. You can adjust amounts slightly based on your taste preferences. Don't like the flavor? Try adding a tiny bit of honey or stevia. The key ingredients and their approximate amounts should stay the same for effectiveness.",
    options: [
      { label: "What if I don't like the taste?", next: "answer_taste" },
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_taste: {
    message: "Totally understandable! Here are some tips: add 1/2 tsp of raw honey or a few drops of stevia to sweeten it up. You can also use slightly warmer water to mellow the flavors. Some women drink it through a straw so it's over quickly. The taste usually becomes easier after 3-4 days as your palate adjusts.",
    options: [
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_miss: {
    message: "Don't worry! Missing one day won't ruin your progress. Simply continue with the next day's protocol as normal. The 30-day plan is designed with flexibility in mind. What matters most is consistency over time, not perfection every single day. Just pick up where you left off!",
    options: [
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_diet: {
    message: "No strict diet is required! The protocol works by resetting your gut bacteria and metabolism from the inside. However, many women naturally find that their cravings decrease and they start choosing healthier foods without forcing it. For best results, try to reduce processed foods and sugar, but you don't need to count calories or follow a specific diet plan.",
    options: [
      { label: "Do I need to exercise?", next: "answer_exercise" },
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_exercise: {
    message: "Exercise is NOT required for the protocol to work. Many women see results with just the daily shots alone. However, light activity like walking (7,000 steps is a great goal!) can enhance your results. Listen to your body — if you feel more energized (which many women do around week 2), use that energy to move more.",
    options: [
      { label: "← Back to Protocol", next: "protocol" },
      { label: "← Main menu", next: "root" },
    ]
  },
  shopping: {
    message: "Let me help you with ingredients and shopping!",
    options: [
      { label: "Where do I buy the ingredients?", next: "answer_where_buy" },
      { label: "Are the ingredients expensive?", next: "answer_cost" },
      { label: "Can I use regular baking soda?", next: "answer_baking_soda" },
      { label: "What brand of ACV is best?", next: "answer_acv" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_where_buy: {
    message: "All ingredients are available at your regular grocery store! Most items like baking soda, lemons, cinnamon, and ginger are in the baking or produce section. For specialty items like matcha, ashwagandha, or maca powder, check the health food aisle, stores like Whole Foods, or order from Amazon. Check the Shopping List in your app for the complete list!",
    options: [
      { label: "Are they expensive?", next: "answer_cost" },
      { label: "← Back to Shopping", next: "shopping" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_cost: {
    message: "Most ingredients cost between $3-8 each and last the entire 30 days (and beyond!). The total investment for all ingredients is typically $30-50 — that's about $1-2 per day. Many women report spending LESS on groceries overall because their cravings for junk food and snacks decrease significantly.",
    options: [
      { label: "← Back to Shopping", next: "shopping" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_baking_soda: {
    message: "Yes! Regular food-grade baking soda like Arm & Hammer works perfectly. Just make sure it's pure sodium bicarbonate with no added ingredients. Do NOT use baking powder — that's a different product. One small box will last you the entire protocol and only costs about $1.",
    options: [
      { label: "← Back to Shopping", next: "shopping" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_acv: {
    message: "Look for apple cider vinegar that says 'with the mother' on the label — that cloudy sediment at the bottom contains the beneficial bacteria. Bragg's is the most popular brand, but any organic ACV with the mother works great. You'll find it in the vinegar aisle at any grocery store.",
    options: [
      { label: "← Back to Shopping", next: "shopping" },
      { label: "← Main menu", next: "root" },
    ]
  },
  health: {
    message: "Your health and safety come first. What's your question?",
    options: [
      { label: "High blood pressure / diabetes?", next: "answer_bp" },
      { label: "Thyroid issues?", next: "answer_thyroid" },
      { label: "Taking medications?", next: "answer_meds" },
      { label: "Pregnant or breastfeeding?", next: "answer_pregnant" },
      { label: "Any side effects?", next: "answer_sides" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_bp: {
    message: "The AlkaLean protocol uses natural ingredients generally considered safe. However, baking soda contains sodium, which may affect blood pressure. If you have high blood pressure, diabetes, or any chronic condition, we strongly recommend consulting your doctor before starting. Your physician can review the ingredient list and advise you personally. Your health always comes first.",
    options: [
      { label: "Taking medications?", next: "answer_meds" },
      { label: "← Back to Health", next: "health" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_thyroid: {
    message: "Many women with thyroid conditions follow the protocol — in fact, some ingredients like ashwagandha and selenium (Brazil nuts) are known to support thyroid function. However, since thyroid conditions affect your metabolism and hormones, please consult your doctor first, especially if you're on thyroid medication like levothyroxine.",
    options: [
      { label: "← Back to Health", next: "health" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_meds: {
    message: "If you're taking any prescription medications, please consult your doctor or pharmacist before starting the protocol. Some natural ingredients (like grapefruit) can interact with certain medications. Your doctor can review the daily ingredient list and let you know if any adjustments are needed. It's always better to be safe.",
    options: [
      { label: "← Back to Health", next: "health" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_pregnant: {
    message: "We do NOT recommend using the AlkaLean protocol during pregnancy or while breastfeeding. Some ingredients (like certain herbs and high doses of spices) have not been tested for safety during pregnancy. Please wait until you're done breastfeeding, then start fresh — the protocol will be here waiting for you!",
    options: [
      { label: "← Back to Health", next: "health" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_sides: {
    message: "Most women experience NO side effects. During the first 2-3 days, some women notice mild bloating or more frequent bathroom visits — this is completely normal and actually a sign that your gut is adjusting. This usually resolves by day 4-5. If you experience anything unusual or uncomfortable, reduce the dosage by half or skip that day. Listen to your body.",
    options: [
      { label: "← Back to Health", next: "health" },
      { label: "← Main menu", next: "root" },
    ]
  },
  results: {
    message: "Let's talk about what to expect!",
    options: [
      { label: "How fast will I see results?", next: "answer_speed" },
      { label: "What results can I expect?", next: "answer_expect" },
      { label: "It works for women over 50?", next: "answer_age" },
      { label: "I've tried everything else...", next: "answer_tried" },
      { label: "Does it work for men?", next: "answer_men" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_speed: {
    message: "Everyone's body is different, but here's what many women report: Days 1-7: reduced bloating and more energy. Days 8-14: clothes starting to fit differently, cravings decreasing. Days 15-30: visible changes, more confidence. Some women notice changes in the first week, while others take 2-3 weeks. Be patient with yourself — sustainable change takes time.",
    options: [
      { label: "What results can I expect?", next: "answer_expect" },
      { label: "← Back to Results", next: "results" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_expect: {
    message: "While individual results vary, many women report: reduced belly bloating, decreased food cravings (especially sugar), more consistent energy throughout the day, better digestion and less discomfort, gradual changes in how their clothes fit, and improved mood and sleep quality. Remember: this is a gentle, natural approach — not an overnight miracle.",
    options: [
      { label: "← Back to Results", next: "results" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_age: {
    message: "Absolutely! In fact, the protocol was specifically designed with women 35-65+ in mind. Many of our most enthusiastic followers are women in their 50s and 60s. As we age, gut health becomes even more important for metabolism, hormones, and overall well-being. It's never too late to give your body the support it needs.",
    options: [
      { label: "← Back to Results", next: "results" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_tried: {
    message: "We hear this a lot, and we understand the frustration. What makes this different is that it's not about restriction or willpower — it works from the inside out by addressing your gut bacteria and metabolism at the root. Many women who 'tried everything' found success here because it's simple (one shot a day), natural, and doesn't require you to overhaul your entire life.",
    options: [
      { label: "← Back to Results", next: "results" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_men: {
    message: "The core ingredients (baking soda, ACV, ginger, etc.) work for anyone regardless of gender. However, the hormonal recipes and some specific protocols were designed specifically for women's hormonal profiles — especially around menopause. Men can certainly benefit from the gut health and metabolic components, but the hormonal section is tailored for women.",
    options: [
      { label: "← Back to Results", next: "results" },
      { label: "← Main menu", next: "root" },
    ]
  },
  app_tech: {
    message: "Technical questions? I can help!",
    options: [
      { label: "Does the app work offline?", next: "answer_offline" },
      { label: "Is my data private?", next: "answer_privacy" },
      { label: "How do I reset my progress?", next: "answer_reset" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_offline: {
    message: "Yes! Once you've loaded the app, most features work offline — including your daily protocol, recipes, shopping list, and progress tracking. All your data is saved locally on your device. You only need internet for the initial load.",
    options: [
      { label: "← Back to App & Technical", next: "app_tech" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_privacy: {
    message: "Your privacy is protected. All your data (weight, photos, journal entries) is stored ONLY on your device's local storage. Nothing is sent to any server. Your progress photos never leave your phone. We don't track, share, or sell any personal information.",
    options: [
      { label: "← Back to App & Technical", next: "app_tech" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_reset: {
    message: "If you want to start fresh, you can clear your browser data for this site, or use a different email address to create a new profile. Your old data won't be deleted — you can always go back to it by logging in with the same email.",
    options: [
      { label: "← Back to App & Technical", next: "app_tech" },
      { label: "← Main menu", next: "root" },
    ]
  },
  guarantee: {
    message: "We want you to feel 100% confident in your purchase.",
    options: [
      { label: "How does the guarantee work?", next: "answer_guarantee" },
      { label: "How do I request a refund?", next: "answer_refund" },
      { label: "← Back to main menu", next: "root" },
    ]
  },
  answer_guarantee: {
    message: "You're covered by a 60-day money-back guarantee. That means you have a full 60 days (twice the length of the protocol!) to try everything risk-free. If for ANY reason you're not satisfied, you can request a complete refund — no questions asked, no hassle, no hard feelings. We believe in this protocol, and we want you to try it with zero risk.",
    options: [
      { label: "How do I request a refund?", next: "answer_refund" },
      { label: "← Main menu", next: "root" },
    ]
  },
  answer_refund: {
    message: "To request a refund, simply send an email to the support address provided in your purchase confirmation email. Include your order number and the email you used to purchase. Refunds are processed within 5-7 business days. No forms to fill, no calls to make, no questions asked. We respect your decision completely.",
    options: [
      { label: "← Back to Guarantee", next: "guarantee" },
      { label: "← Main menu", next: "root" },
    ]
  },
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState('root');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const node = FAQ_TREE.root;
      setMessages([{ type: 'bot', text: node.message, options: node.options }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOption = (option) => {
    const newMessages = [...messages, { type: 'user', text: option.label }];
    const node = FAQ_TREE[option.next];
    if (node) {
      newMessages.push({ type: 'bot', text: node.message, options: node.options });
      setCurrentNode(option.next);
    }
    setMessages(newMessages);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.toLowerCase().trim();
    setInputText('');

    const newMessages = [...messages, { type: 'user', text: inputText }];

    const keywordMap = [
      { keywords: ['refund', 'money back', 'return', 'cancel'], node: 'answer_refund' },
      { keywords: ['guarantee', 'warranty'], node: 'answer_guarantee' },
      { keywords: ['side effect', 'safe', 'danger'], node: 'answer_sides' },
      { keywords: ['blood pressure', 'diabetes', 'sugar'], node: 'answer_bp' },
      { keywords: ['thyroid'], node: 'answer_thyroid' },
      { keywords: ['pregnant', 'breastfeed', 'nursing', 'baby'], node: 'answer_pregnant' },
      { keywords: ['medication', 'medicine', 'drug', 'pill'], node: 'answer_meds' },
      { keywords: ['result', 'how long', 'how fast', 'when'], node: 'answer_speed' },
      { keywords: ['buy', 'where', 'store', 'shop', 'purchase', 'ingredient'], node: 'answer_where_buy' },
      { keywords: ['cost', 'expensive', 'price', 'cheap'], node: 'answer_cost' },
      { keywords: ['baking soda', 'sodium bicarbonate'], node: 'answer_baking_soda' },
      { keywords: ['vinegar', 'acv'], node: 'answer_acv' },
      { keywords: ['taste', 'flavor', 'gross', 'yuck'], node: 'answer_taste' },
      { keywords: ['miss', 'skip', 'forgot', 'missed'], node: 'answer_miss' },
      { keywords: ['diet', 'eat', 'food', 'calorie'], node: 'answer_diet' },
      { keywords: ['exercise', 'gym', 'workout', 'walk'], node: 'answer_exercise' },
      { keywords: ['offline', 'internet', 'wifi'], node: 'answer_offline' },
      { keywords: ['privacy', 'private', 'data', 'photo'], node: 'answer_privacy' },
      { keywords: ['reset', 'start over', 'restart'], node: 'answer_reset' },
      { keywords: ['men', 'husband', 'boyfriend', 'male'], node: 'answer_men' },
      { keywords: ['age', 'old', '50', '60', 'senior'], node: 'answer_age' },
      { keywords: ['adjust', 'change', 'modify', 'customize'], node: 'answer_adjust' },
      { keywords: ['morning', 'when', 'time', 'take'], node: 'answer_when' },
      { keywords: ['what is', 'how does', 'explain', 'shot'], node: 'answer_shot' },
    ];

    let matched = null;
    for (const entry of keywordMap) {
      if (entry.keywords.some(kw => query.includes(kw))) {
        matched = entry.node;
        break;
      }
    }

    if (matched && FAQ_TREE[matched]) {
      const node = FAQ_TREE[matched];
      newMessages.push({ type: 'bot', text: node.message, options: node.options });
      setCurrentNode(matched);
    } else {
      newMessages.push({
        type: 'bot',
        text: "I'm not sure I understand that question. Let me show you the topics I can help with!",
        options: FAQ_TREE.root.options
      });
      setCurrentNode('root');
    }

    setMessages(newMessages);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 bg-[#5B8C5A] text-white p-4 rounded-full shadow-lg shadow-[#5B8C5A]/30 hover:bg-[#4A7A49] transition-all animate-scale-in"
          aria-label="Open Help Chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-slide-up max-w-md mx-auto">
          <div className="bg-[#5B8C5A] text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">AlkaLean Help</h3>
                <p className="text-[11px] text-green-100">Always here for you</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.type === 'user' ? '' : ''}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-[#5B8C5A] text-white rounded-br-md'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="mt-2 space-y-1.5">
                      {msg.options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => handleOption(opt)}
                          className="w-full text-left px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-[#5B8C5A] hover:text-[#5B8C5A] transition-colors flex items-center justify-between"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleTextSubmit} className="border-t border-gray-200 bg-white p-3 flex items-center space-x-2 flex-shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B8C5A]"
            />
            <button type="submit" className="bg-[#5B8C5A] text-white p-2.5 rounded-full hover:bg-[#4A7A49] transition-colors flex-shrink-0">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
