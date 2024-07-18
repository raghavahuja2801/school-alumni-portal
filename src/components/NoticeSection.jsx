import React from 'react';

function NoticeSection({ user}) {
  const  notices = [{'Hey': "how are you"},]
  return (
    <div className="notice-section">
      {notices.map((notice, index) => (
        <div key={index} className="notice">
          <h3>{notice.title}</h3>
          <p>{notice.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoticeSection;
