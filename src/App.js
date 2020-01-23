import React from 'react';
import Axios from 'axios';
import './App.css';

class App extends React.Component {
    state = {
        news: [],
        title: "",
        text: ""
    }

    async componentDidMount() {
       const res = await Axios.get('http://localhost:2992')
        this.setState({
            news:res.data
        })
    }

    titleAdd = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    textAdd = (event) => {
        this.setState({
            text: event.target.value
        })
    }
    reset = () => {
        this.setState({
            title: "",
            text: ""
        })
    }

    submit = (event) => {
        Axios.post('http://localhost:2992', {
            title: this.state.title,
            text: this.state.text
        })
        .then(res => {
            this.reset()
            alert(res.data)
            Axios.get('http://localhost:2992')
                .then(res => this.setState({ news: res.data })
                )
            })
    }

    render() {
        return <div>
            <input value={this.state.title} onChange={this.titleAdd} />
            <input value={this.state.text} onChange={this.textAdd} />
            <button onClick={this.submit}>Add This</button>
            {this.state.news.map((item, index) =>
                <div key={index}>
                    <h1>{item.title}</h1>
                    <p>{item.body}</p>
                </div>
            )}
        </div>
    }

}

export default App;
