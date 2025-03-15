import React from 'react';
import './home.css'; // Optional: Add styles in a separate CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <ul>
          <li><a href="#html">HTML</a>
            <ul>
              <li><a href="#attributes">Attributes</a></li>
              <li><a href="#elements">Elements</a></li>
              <li><a href="#miscellaneous">Miscellaneous</a></li>
              <li><a href="#obsolete">Obsolete</a></li>
            </ul>
          </li>
          <li><a href="#http">HTTP</a></li>
          <li><a href="#javascript">JavaScript</a>
            <ul>
              <li><a href="#web-apis">Web APIs</a></li>
            </ul>
          </li>
          <li><a href="#disabled">DISABLED (723)</a></li>
          {/* Add more sections as needed */}
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <h1>HTML: HyperText Markup Language</h1>
        <p>
          HTML (HyperText Markup Language) is the most basic building block of the web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance and functionality.
        </p>
        <p>
          "Hypertext" refers to links that connect web pages to one another, either within a single website or between sites. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web.
        </p>
        <p>
          HTML uses "markup" to annotate text, images, and other content for display in a web browser. HTML markup includes special "elements" such as 
          <code>&lt;head&gt;</code>, <code>&lt;title&gt;</code>, <code>&lt;body&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>, 
          <code>&lt;section&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;audio&gt;</code>, 
          <code>&lt;canvas&gt;</code>, <code>&lt;datalist&gt;</code>, <code>&lt;details&gt;</code>, <code>&lt;embed&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;search&gt;</code>, 
          <code>&lt;output&gt;</code>, <code>&lt;progress&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>, and many others.
        </p>
        <p>
          An HTML element is set off from other text in a document by "tags", which consist of the element name surrounded by "&lt;" and "&gt;". The name of an element inside a tag is case-insensitive. That is, it can be written in uppercase, lowercase, or a mixture. For example, the <code>&lt;title&gt;</code> tag can be written as <code>&lt;TITLE&gt;</code>, or in any other way. However, the convention and recommended practice is to write tags in lowercase.
        </p>

        {/* Key Resources Section */}
        <section className="key-resources">
          <h2>Key Resources</h2>
          <ul>
            <li>
              <a href="#html-introduction">HTML Introduction</a>
              <p>If you're new to web development, be sure to read our "HTML Basics" article to learn what HTML is and how to use it.</p>
            </li>
            <li>
              <a href="#html-tutorials">HTML Tutorials</a>
              <p>For articles about how to use HTML, as well as tutorials and complete examples, check out our <a href="#html-learning-area">HTML Learning Area</a>.</p>
            </li>
          </ul>
        </section>
      </main>

      {/* Tracking Cookies Notice */}
      <footer className="cookie-notice">
        <p>
          We would like to gather usage data about how DevDocs is used through Google Analytics and Gauges. We only collect anonymous traffic information. Please confirm if you accept our tracking cookies. You can always change your decision in the settings.
          <button onClick={() => alert('Accept clicked')}>Accept</button>
          <button onClick={() => alert('Decline clicked')}>Decline</button>
        </p>
      </footer>
    </div>
  );
};

export default Home;