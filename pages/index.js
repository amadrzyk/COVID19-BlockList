import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default class Home extends React.Component {

    static async getInitialProps(ctx) {
        let response;

        // try https first
        try {
            response = await axios.get(`https://${ctx.req.headers.host}/README.md`);
        } catch (err){
            console.error(err);
        }

        // then try http
        try {
            response = await axios.get(`http://${ctx.req.headers.host}/README.md`);
        } catch (err){
            console.error(err);
        }

        return {readme: response ? response.data : ''};
    }

    render() {

        return (
            <div className="markdown-body">
                <Head>
                    <title>COVID-19 BlockList</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <h1 id="title">
                        COVID-19 BlockList
                    </h1>

                    <p className="description">
                        {/*<span>Find hospitals near you that are seeking PPE donations | </span>*/}
                        <span>API to check if your API endpoints contain malaware</span>
                        <br/>
                        {/*<img src="/Octicons-mark-github.svg" alt="github logo"/>*/}
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/amadrzyk/COVID19-BlockList">
                            Github Repository
                        </a>
                    </p>

                    <div className="readmeBody">
                        <ReactMarkdown source={this.props.readme} />
                    </div>
                </main>
                <footer>
                    Made with 💙 by the COVID-19 Response Team and the&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/InventionCorps/">Invention Corps</a>&nbsp;Community
                </footer>
            </div>
        )
    }
}
