import React from 'react';
import axios from "axios";

const url = "http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html";

class Example extends React.Component {

    onSample = () => {

        // get part
        axios.get(url)
        .then(res => {
            console.log(res);
        })
        .catch(res => {
            console.log('error');
        });
    }

    onSamplePost = () => {
        // post part
        const data = {
            name : "xxx",
            age : 20
        }
        axios.post(url, data)
        .then(res => {

        })
        .catch(res => {
            console.log('error');
        })
    }

    render() {
        return (
                <div>
                    <button onClick={() => onSample()}>Get Sample</button>
                    <button onClick={() => onSamplePost()}>Post Sample</button>
                </div>
            )
    }
}


export default Example;