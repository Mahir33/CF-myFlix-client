import { createRoot } from 'react-dom/client';
import './index.scss';

const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <h1>myFlix Application</h1>
        </div>
    );
};

const App = () => {
    return (
        <MyFlixApplication />
    );
}


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);