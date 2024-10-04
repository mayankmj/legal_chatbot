import React, { useState } from 'react';
const dataCollection = [
  {
    question: 'What are universal human rights?',
    answer: 'Universal human rights are fundamental freedoms and entitlements inherent to all individuals, irrespective of nationality or status. Enshrined in the Universal Declaration of Human Rights (UDHR), they encompass civil, political, economic, social, and cultural rights, aiming to ensure dignity, equality, and justice worldwide. Despite challenges, the international community continues to advocate for their protection and promotion. '
  }, {
    question: 'How do court proceedings work?',
    answer: 'Court proceedings involve a structured legal process where parties present evidence and arguments before a judge or jury. The plaintiff initiates the case, followed by the defendant\'s response. Discovery, pre-trial motions, and a trial where evidence is presented and legal arguments are made precede a final judgment, which may be appealed by dissatisfied parties.'
  }, {
question: 'Can my rights be taken away in certain situations?',
    answer: 'Yes, in specific situations, governments may restrict individual rights for reasons like national security or public health. However, these limitations must be proportionate, lawful, and subject to legal scrutiny. Individuals typically have the right to challenge such restrictions in court.'
  }, {
question: 'What should I do if I\'m arrested?',
    answer: 'If you\'re arrested, stay calm and comply with law enforcement. You have the right to remain silent and consult with an attorney. Avoid self-incrimination, request legal representation, and do not waive your rights during questioning. Seek legal advice promptly to understand your options and ensure a fair legal process.'
  },{
question: 'What are my rights in a divorce or separation?',
    answer: 'In a divorce or separation, you have the right to legal representation. You may negotiate terms or, if necessary, seek court intervention for matters like child custody, spousal support, and the division of assets. It\'s essential to understand and assert your rights throughout the process, possibly with the guidance of a family law attorney.'
  },{
question: 'How do legal settlements and negotiations occur?',
    answer: 'Legal settlements and negotiations involve parties in a legal dispute reaching an agreement outside of court. Attorneys for each side communicate and negotiate terms, often involving concessions and compromises. Once an agreement is reached, it is documented in a legally binding settlement agreement, resolving the dispute without the need for a trial.'
  },{
question: 'How does international law protect human rights? ',
    answer: 'International law protects human rights through treaties, conventions, and agreements that establish standards accepted by the global community. International bodies like the United Nations monitor compliance and provide mechanisms for addressing violations. Individuals can seek recourse through international courts and tribunals, demonstrating a commitment to upholding human rights on a global scale.'
  },{
question: 'How does property ownership and transfer work?',
    answer: 'Property ownership and transfer involve legal processes. To acquire property, individuals typically go through a purchase, inherit, or receive it as a gift. Transfer is formalized through deeds, with legal requirements varying by jurisdiction, ensuring a transparent and lawful transition of ownership.'
  },{
question: 'How are laws created and changed?',
    answer: 'Laws are created and changed through a legislative process involving the introduction, debate, and approval of bills in a legislative body, such as a parliament or congress. Proposed laws undergo committee review, public hearings, and voting before becoming statutes. Amendments and repeals can occur through a similar process, allowing for the evolution of legal frameworks.'
  },{
question: 'What are the rights of an accused person in India?',
    answer: 'An accused person in India has the right to legal representation, the presumption of innocence until proven guilty, and protection against self-incrimination.'
  },{
question: 'What is the process for buying property in India?',
    answer: 'To buy property in India, one must verify land titles, obtain a sale deed, and register the property with the local authorities. Legal documentation and due diligence are crucial steps in this process.'
  },{
question: 'How does the civil litigation process work in India?',
    answer: 'Civil litigation in India involves filing a plaint, serving notice to the defendant, presenting evidence, and attending court hearings. The resolution may include compensation, injunctions, or specific performance orders.'
  },{
question: 'How is online privacy protected in India?',
    answer: 'Online privacy in India is protected through the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, which mandate entities to implement security measures for handling personal data and ensure its confidentiality.'
  },{
question: 'What are the income tax regulations in India?',
    answer: ' Income tax regulations in India govern the assessment and taxation of income. Taxpayers need to file annual returns, declare income, and adhere to tax slabs based on their earnings.'
  },
];

const Faq = () => {
  const [accordion, setActiveAccordion] = useState(-1);

  function toggleAccordion(index) {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  }

  return (
    <div className="faq-section max-w-7xl mx-auto p-6 lg:px-8 lg:py-16">
      <div className="faq-header flex flex-col lg:flex-row items-center justify-between mb-12">
        <div className="faq-header-text text-center lg:text-left">
          <span className="block text-4xl font-bold text-gray-800 mb-2">Frequently Asked Questions</span>
          <h6 className="text-2xl text-gray-600">Let's answer some of your questions</h6>
        </div>
        <div className="faq-header-image mt-6 lg:mt-0">
          <img src="/faq-img.png" alt="faq-img" className="w-48 lg:w-64"/>
        </div>
      </div>
      
      <div className="faq-container">
        <div className="space-y-6">
          {dataCollection.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <div 
                className="accordion__faq-heading flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h1 className={`text-lg font-semibold ${accordion === index ? "text-blue-600" : "text-gray-800"}`}>
                  {item.question}
                </h1>
                <div>
                  {accordion === index ? (
                    <span className="text-blue-600 text-2xl">-</span>
                  ) : (
                    <span className="text-gray-600 text-2xl">+</span>
                  )}
                </div>
              </div>
              <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${accordion === index ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 mt-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
