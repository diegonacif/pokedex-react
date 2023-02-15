import { useEffect, useState } from 'react'
import api from './services/api';

import './css/App.css';
import { Card } from './components/Card/Card';


export const App = () => {
  
  return (
    <div className="app-body">
      <main>
        <div className="main-content">
          <Card />
        </div>
      </main>
    </div>
  )
}
