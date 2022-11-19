import '../css/Title.css'
import {Link} from 'react-router-dom';

function Title(){
    return (
        <div className='center'>
            <div className='body'>
                <div className='wrapper'>
                    <div className='title'>
                        Quacked Up
                    </div>
                </div>
                    <div className='tagline'>insert tagline</div>
                    <Link to='/landing'>
                        <button className='start-button'>
                            start
                        </button>

                    </Link>
            </div>
        </div>
    );
}

export default Title;