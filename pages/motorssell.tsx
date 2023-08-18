import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document'; 
import car from './icons/car.png';
import house from './icons/house.png';
import insurance from './icons/insurance.png';
import service from './icons/service.png';
import keyboard from './icons/keyboard.png';
import deal from './icons/deal.png';
import forsale from './icons/for-sale.png';
import wheel from './icons/wheel.png';
import carcheck from './icons/carcheck.png';
import { useRouter } from 'next/router';
import Link from 'next/link';


import logoo from './icons/logoo.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Motors() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'What type of vehicle do you want to sell?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }

      setLoading(false);

      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
    }
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  const handleTileClick = (tileLabel: string) => {
    // Handle navigation to appropriate page based on the tile clicked
    // Example: router.push(`/category/${tileLabel.toLowerCase()}`);
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col gap-4 ">
        <div className="grid grid-cols-5 gap-2 items-center text-center ">
           
           
            <div className='flex flex-center items-center justify-center'>
  {/* <div className='text-center'>
    <Image
      src={logoo} 
      alt="Car Insurance"
      width="150"
      height="150"
    />
  </div> */}
</div>

          
          </div>
          <div className="flex justify-center gap-2 text-center">
  {/* Square Tiles with Icons and Text */}
  <Link href="/motorsbuy">
  <div
    className="text-center" 
    style={{
      background: "#F1D8D8",
      width:"80",
      height:"80",
      borderRadius: "15px",
      cursor: "pointer",
      margin: "30px",
      position: "relative"
    }}
    onClick={() => handleTileClick("Motors")}
  >
    <Image src={deal} alt="Motors" width="120" height="120" />
    <p className="mt-2" style={{ color: "#EA4141", fontSize: "16px", fontWeight: "bold" }}>
      Buy
    </p>
  </div>
  </Link>

  <div
  className="text-center" 
  style={{
    background: "#F1D8D8",
    width: "80",
    height: "80",
    borderRadius: "15px",
    cursor: "pointer",
    margin: "30px",
    position: "relative", // Added position for proper positioning of the rectangle
  }}
  onClick={() => handleTileClick("Motors")}
>
  <Image src={forsale} alt="Motors" width="120" height="120" />
  <p className="mt-2" style={{ color: "#EA4141", fontSize: "16px", fontWeight: "bold" }}>
    Sell
  </p>

  {/* Red colored tiny rectangle */}
  <div
    style={{
      position: "absolute",
      bottom: "-10px", // Adjust the value as needed for positioning
      left: "50%", // To center the rectangle
      transform: "translateX(-50%)", // To center the rectangle
      width: "90px", // Adjust width as needed
      height: "8px", // Adjust height as needed
      background: "#EA4141",
      borderRadius: "30px",
    }}
  ></div>
</div>

  <Link href="/motorsmaintainance">
  <div
    className="text-center"
    style={{
      background: "#F1D8D8",
      borderRadius: "15px",
      cursor: "pointer",
      margin: "30px",
    }}
    onClick={() => handleTileClick("Car Insurance")}
  >
    <Image src={carcheck} alt="Car Insurance" width="120" height="120" />
    <p className="mt-2" style={{ color: "#EA4141", fontSize: "16px", fontWeight: "bold" }}>
      Maintainance
    </p>
  </div>
  </Link>
  <Link href="/motorsaccesories">
  <div
    className="text-center"
    style={{
      background: "#F1D8D8",
      borderRadius: "15px",
      cursor: "pointer",
      margin: "30px",
    }}
    onClick={() => handleTileClick("Pro Offers")}
  >
    <Image src={wheel} alt="Icon 4" width="120" height="120" />
    <p className="mt-2" style={{ color: "#EA4141", fontSize: "16px", fontWeight: "bold" }}>
      Accesories
    </p>
  </div>
  </Link>

  {/* <div
    className="text-center"
    style={{
      background: "#F1D8D8",
      borderRadius: "15px",
      cursor: "pointer",
      margin: "30px",
    }}
    onClick={() => handleTileClick("Typing")}
  >
    <Image src={keyboard} alt="Icon 5" width="120" height="120" />
    <p className="mt-2" style={{ color: "#EA4141", fontSize: "16px", fontWeight: "bold" }}>
      Typing
    </p>
  </div> */}
</div>

          <main className={styles.main} style={{ height: '10%' }}> {/* Reduce the height by 75% */}
            <div className={styles.cloud}>
              <div ref={messageListRef} className={styles.messagelist}>
                {messages.map((message, index) => {
                  let icon;
                  let className;
                  if (message.type === 'apiMessage') {
                    icon = (
                      <Image
                        key={index}
                        src="/bot-image.png"
                        alt="AI"
                        width="40"
                        height="40"
                        className={styles.boticon}
                        priority
                      />
                    );
                    className = styles.apimessage;
                  } else {
                    icon = (
                      <Image
                        key={index}
                        src="/usericon.png"
                        alt="Me"
                        width="30"
                        height="30"
                        className={styles.usericon}
                        priority
                      />
                    );
                    className =
                      loading && index === messages.length - 1
                        ? styles.usermessagewaiting
                        : styles.usermessage;
                  }
                  return (
                    <div key={`chatMessage-${index}`} className={className}>
                      {icon}
                      <div className={styles.markdownanswer}>
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                      </div>
                      {message.sourceDocs && (
                        <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                          <Accordion type="single" collapsible className="flex-col">
                            {message.sourceDocs.map((doc, index) => (
                              <div key={`messageSourceDocs-${index}`}>
                                <AccordionItem value={`item-${index}`}>
                                  <AccordionTrigger>
                                    <h3>Source {index + 1}</h3>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ReactMarkdown linkTarget="_blank">
                                      {doc.pageContent}
                                    </ReactMarkdown>
                                    <p className="mt-2">
                                      <b>Source:</b> {doc.metadata.source}
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </div>
                            ))}
                          </Accordion>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.cloudform}>
                <form onSubmit={handleSubmit}>
                  <textarea
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={textAreaRef}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading
                        ? 'Waiting for response...'
                        : 'Ask me anything about our services...'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.textarea}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.generatebutton}
                  >
                    {loading ? (
                      <div className={styles.loadingwheel}>
                        <LoadingDots color="#000" />
                      </div>
                    ) : (
                      // Send icon SVG in input field
                      <svg
                        viewBox="0 0 20 20"
                        className={styles.svgicon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
            {error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </main>
          <footer className="m-auto p-4">
            {/* Footer content */}
          </footer>
        </div>
      </Layout>
    </>
  );
}
