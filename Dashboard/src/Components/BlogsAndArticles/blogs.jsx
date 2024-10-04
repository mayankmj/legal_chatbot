import React, { useEffect } from 'react';

const Blogs = () => {

  useEffect(() => {
    window.location.href = 'https://onestopsol.netlify.app';
  }, []);

  return (
    <div className='text-4xl flex justify-center items-center'>
        Coming Soon
    </div>
  );
}

export default Blogs;
