import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="NotFound">
        <h1>
        Не найдено
        </h1>
        <h3>
        Извините, мы не можем найти то, что вы ищете.
        </h3>
        <Link to="/login">На главную</Link>
    </div>
  );
}

export default NotFound;