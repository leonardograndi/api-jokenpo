import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getmuiTheme, { getMuiTheme } from 'material-ui/styles/getMuiTheme';
import io from 'socket.io-client';
import './game.css';

import buttonPedra1 from './img/buttonPedra1.png';
import buttonPedra2 from './img/buttonPedra2.png';
import buttonPedra3 from './img/buttonPedra3.png';
import buttonPedra4 from './img/buttonPedra4.png';

import buttonPapel1 from './img/buttonPapel1.png';
import buttonPapel2 from './img/buttonPapel2.png';
import buttonPapel3 from './img/buttonPapel3.png';
import buttonPapel4 from './img/buttonPapel4.png';

import buttonTesoura1 from './img/buttonTesoura1.png';
import buttonTesoura2 from './img/buttonTesoura2.png';
import buttonTesoura3 from './img/buttonTesoura3.png';
import buttonTesoura4 from './img/buttonTesoura4.png';

import buttonVersus1 from './img/buttonVersus1.png';
import buttonVersus2 from './img/buttonVersus2.png';
import buttonVersus3 from './img/buttonVersus3.png';
import buttonVersus4 from './img/buttonVersus4.png';

import buttonSair1 from './img/buttonSair1.png';
import buttonSair2 from './img/buttonSair2.png';
import buttonSair3 from './img/buttonSair3.png';

import jkpio from './img/jkpio.png';

import start from './img/start.png';
import vocevenceu from './img/vocevenceu.png';
import naofoidessavez from './img/naofoidessavez.png';
import procurandojogador from './img/procurandojogador.png';

import background0 from './img/background0.png';
import background1 from './img/background1.png';
import background2 from './img/background2.png';
import background3 from './img/background3.png';
import background4 from './img/background4.png';
import background5 from './img/background5.png';
import background6 from './img/background6.png';
import background7 from './img/background7.png';
import background8 from './img/background8.png';



var socket, timer, timerJogada;

const muiTheme = getmuiTheme({});



class Game extends Component {
    constructor() {
        super();
        this.state = {

            nickname: '',
            oponente: '',
            meuPlacar: 0,
            placarOponente: 0,
            avisoMsg: '',
            avisoButton1: '',
            avisoButton2: '',

            jogada: '',
            autorizado: false,
            decidirEmitido: false,

            anim: '',
            animOpponent: '',
            animLoading: '',
            animStart: '',
            animEnd: '',
            animEsperando: '',
            resultadoImg: '',
            animContagem: '',

            buttonPedra: buttonPedra4,
            buttonPapel: buttonPapel4,
            buttonTesoura: buttonTesoura4,
            buttonVersus: buttonVersus1,
            buttonSair: buttonSair3,

            cenario: background0,

            sizeAux: '10'
        };
    };





    componentWillMount() {
        this.ajustarProporcao();

        // this.socket = io.connect('http://localhost:5000/');

        this.socket = io.connect('http://localhost:3000/');

        this.socket.on('oponente', (msg, rand) => {
            if (msg !== this.state.nickname) {
                if (msg === '') {
                    this.restaurarPadrao();
                }
                else {
                    this.setState({
                        buttonVersus: buttonVersus4,
                        buttonSair: buttonSair1,
                        oponente: msg,
                        animStart: 'blink',
                        animLoading: ''
                    });

                }
            }
        });


        this.socket.on('cenario', (rand) => {
            switch(rand) {
                case 1:
                    this.setState({
                        cenario: background1
                    });
                break;
                case 2:
                    this.setState({
                        cenario: background2
                    });
                break;
                case 3:
                    this.setState({
                        cenario: background3
                    });
                break;
                case 4:
                    this.setState({
                        cenario: background4
                    });
                break;
                case 5:
                    this.setState({
                        cenario: background5
                    });
                break;
                case 6:
                    this.setState({
                        cenario: background6
                    });
                break;
                case 7:
                    this.setState({
                        cenario: background7
                    });
                break;
                case 8:
                    this.setState({
                        cenario: background8
                    });
                break;
                
            }
        });


        

        this.socket.on('oponenteJogou', () => {
            if (this.state.jogada !== '') {
                this.setState({
                    decidirEmitido: true
                });
                this.socket.emit('decidir', this.state.jogada);
            }
            else {
                this.setState({
                    animEsperando: 'esperando esperando-aberto'
                });
            }
        });

        this.socket.on('desistiu', () => {
            this.restaurarPadrao();
            this.showHideAviso('desistiu');
        });

        this.socket.on('desconectado', () => {
            this.restaurarPadrao();
            this.showHideAviso('desconectado');
        });

        this.socket.on('decidir', (msg) => {

            this.stopTimerJogada();
            this.setState({
                animContagem: ''
            });

            if (this.state.animEsperando !== 'esperando') {
                this.setState({
                    animEsperando: 'esperando'
                });
            }

            if (this.state.decidirEmitido === false) {
                this.socket.emit('decidir', this.state.jogada);
            }

            this.playAnim(msg);

            setTimeout(() => {

                if ((msg === 'Pedra' && this.state.jogada === 'Pedra') || (msg === 'Tesoura' && this.state.jogada === 'Tesoura') || (msg === 'Papel' && this.state.jogada === 'Papel')) {

                }
                else if ((msg === 'Pedra' && this.state.jogada === 'Papel') || (msg === 'Tesoura' && this.state.jogada === 'Pedra') || (msg === 'Papel' && this.state.jogada === 'Tesoura')) {
                    this.setState({
                        meuPlacar: this.state.meuPlacar + 1
                    });
                }
                else if ((msg === 'Pedra' && this.state.jogada === 'Tesoura') || (msg === 'Tesoura' && this.state.jogada === 'Papel') || (msg === 'Papel' && this.state.jogada === 'Pedra')) {
                    this.setState({
                        placarOponente: this.state.placarOponente + 1
                    });
                }

            }, 2600);





        });
    };



    componentDidMount() {

        window.addEventListener('resize', () => {

            this.ajustarProporcao();

        }, false);

        let animacao = document.getElementById('myAnim');
        let somAnimacao = document.getElementById('animationSound');
        let animacaoStart = document.getElementById('startAnim');
        let animacaoEnd = document.getElementById('endAnim');
        let animacaoContagem = document.getElementById('contagemAnim');


        animacaoContagem.addEventListener('animationend', () => {

            if (this.state.jogada === '' && this.state.autorizado) {

                let rand = Math.floor(Math.random() * 3) + 1;

                if (rand === 1) {
                    this.jogada("Pedra");
                }
                else if (rand === 2) {
                    this.jogada("Papel");
                }
                else {
                    this.jogada("Tesoura");
                }
            }
            this.setState({
                animContagem: ''
            });
        }, false);


        animacaoStart.addEventListener('animationend', () => {
            this.setState({
                buttonPapel: buttonPapel1,
                buttonPedra: buttonPedra1,
                buttonTesoura: buttonTesoura1,
                animStart: '',
                autorizado: true
            });

            this.startTimerJogada();

        }, false);

        animacaoEnd.addEventListener('animationend', () => {
            this.quit('gameover');
        }, false);


        if (animacao) {



            animacao.addEventListener('animationstart', () => {
                // somAnimacao.currentTime = 0;
                // somAnimacao.play();
            }, false);



            animacao.addEventListener('animationend', () => {

                this.setState({
                    anim: '',
                    animOpponent: ''
                });


                if (this.state.meuPlacar === 3) {
                    timer = setInterval(this.fimDeJogo('Ganhou'), 250);
                }
                else if (this.state.placarOponente === 3) {
                    timer = setInterval(this.fimDeJogo('Perdeu'), 250);
                }
                else {
                    timer = setInterval(this.resetPartida, 250);
                }
            }, false);

        }

    }

    ajustarProporcao = () => {

        if (window.innerHeight < window.innerWidth) {
            this.setState({
                sizeAux: '8'
            });
        }
        else {
            this.setState({
                sizeAux: '10'
            });
        }
    }

    startTimerJogada = async () => {
        timerJogada = setInterval(() => {
            this.setState({
                animContagem: 'contagem contagem-play'
            });
            this.stopTimerJogada();
        }, 3000);
    };

    stopTimerJogada = () => {
        clearInterval(timerJogada);
    };

    playAnim = async (msg) => {
        if (msg === 'Pedra') {
            this.setState({
                animOpponent: 'pedra anim-play'
            });
        }
        else if (msg === 'Papel') {
            this.setState({
                animOpponent: 'papel anim-play'
            });
        }
        else if (msg === 'Tesoura') {
            this.setState({
                animOpponent: 'tesoura anim-play'
            });
        }

        if (this.state.jogada === 'Pedra') {
            this.setState({
                anim: 'pedra anim-play'
            });
        }
        else if (this.state.jogada === 'Papel') {
            this.setState({
                anim: 'papel anim-play'
            });
        }
        else if (this.state.jogada === 'Tesoura') {
            this.setState({
                anim: 'tesoura anim-play'
            });
        }
    };

    fimDeJogo = (msg) => {
        if (msg === 'Ganhou') {
            this.setState({
                resultadoImg: vocevenceu,
                animEnd: 'fade'
            });
        }
        else {
            this.setState({
                resultadoImg: naofoidessavez,
                animEnd: 'fade'
            });
        }
        clearInterval(timer);

    };

    restaurarPadrao = () => {
        clearInterval(timer);
        this.stopTimerJogada();
        this.setState({
            oponente: '',
            meuPlacar: 0,
            placarOponente: 0,
            jogada: '',
            decidirEmitido: false,
            anim: '',
            animOpponent: '',
            animLoading: '',
            animStart: '',
            animEsperando: '',
            animEnd: '',
            resultadoImg: '',
            animContagem: '',
            buttonPedra: buttonPedra4,
            buttonPapel: buttonPapel4,
            buttonTesoura: buttonTesoura4,
            buttonVersus: buttonVersus1,
            buttonSair: buttonSair3,
            avisoMsg: '',
            avisoButton1: '',
            avisoButton2: '',
            autorizado: false,
            cenario: background0
        });
    };

    resetPartida = () => {
        clearInterval(timer);
        this.setState({
            jogada: '',
            decidirEmitido: false,
            buttonPapel: buttonPapel1,
            buttonPedra: buttonPedra1,
            buttonTesoura: buttonTesoura1,
            autorizado: true
        });
        this.startTimerJogada();
    };




    procurarJogador = () => {

        if (this.state.buttonVersus === buttonVersus2) {
            this.socket.emit('join', this.state.nickname);
            this.setState({
                buttonVersus: buttonVersus3,
                animLoading: 'loading loading-play'
            });
        }


    };

    showHideAviso = (msg) => {
        if (msg === 'sair' && this.state.buttonSair === buttonSair2) {
            this.setState({
                avisoMsg: 'ABANDONAR PARTIDA?',
                avisoButton1: 'SIM',
                avisoButton2: 'NÃO'
            });
        }
        else if (msg === 'desistiu') {
            this.setState({
                avisoMsg: 'O adversário desistiu',
                avisoButton1: 'OK'
            });
        }
        else if (msg === 'desconectado') {
            this.setState({
                avisoMsg: 'Conexão perdida',
                avisoButton1: 'OK'
            });
        }
        else if (msg === 'fechar') {
            this.setState({
                avisoMsg: '',
                avisoButton1: '',
                avisoButton2: ''
            });
        }



    };

    quit(msg) {
        if (this.state.oponente !== '') {
            this.socket.emit(msg);
        }
        this.restaurarPadrao();
    };

    inputChange = (e) => {
        this.setState({
            nickname: e.target.value
        });
    };



    jogada = (esc) => {


        if (this.state.jogada === '' && this.state.autorizado) {
            if (esc === 'Pedra') {
                this.setState({
                    buttonPedra: buttonPedra3,
                    buttonPapel: buttonPapel4,
                    buttonTesoura: buttonTesoura4
                });
            }
            else if (esc === 'Papel') {
                this.setState({
                    buttonPedra: buttonPedra4,
                    buttonPapel: buttonPapel3,
                    buttonTesoura: buttonTesoura4
                });
            }
            else if (esc === 'Tesoura') {
                this.setState({
                    buttonPedra: buttonPedra4,
                    buttonPapel: buttonPapel4,
                    buttonTesoura: buttonTesoura3
                });
            }
            this.setState({
                jogada: esc,
                autorizado: false
            });
            this.socket.emit('oponenteJogou');
        }
    };

    animButton = (esc) => {
        if (this.state.jogada === '' && this.state.autorizado) {
            if (esc === 'Pedra') {
                this.setState({
                    buttonPedra: buttonPedra2
                });
            }
            else if (esc === 'Papel') {
                this.setState({
                    buttonPapel: buttonPapel2
                });
            }
            else if (esc === 'Tesoura') {
                this.setState({
                    buttonTesoura: buttonTesoura2
                });
            }
        }
        if (esc === 'Procurar' && this.state.buttonVersus === buttonVersus1) {
            this.setState({
                buttonVersus: buttonVersus2
            });
        }
        if (esc === 'Sair' && this.state.buttonSair === buttonSair1) {
            this.setState({
                buttonSair: buttonSair2
            });
        }
    };

    restaurarBotao = (esc) => {
        if (this.state.jogada === '' && this.state.autorizado && esc==='') {
            this.setState({
                buttonPedra: buttonPedra1,
                buttonPapel: buttonPapel1,
                buttonTesoura: buttonTesoura1
            });
        }
        if (esc === 'Procurar' && this.state.buttonVersus === buttonVersus2) {
            this.setState({
                buttonVersus: buttonVersus1
            });
        }
    };


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={{backgroundImage: 'url('+this.state.cenario+')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',position: 'fixed',top: '0',left: '0',width: '100%',height: '100%'}}>

                    <div style={{ position: 'absolute', top: (this.state.sizeAux * 0.95) + 'vh', right: (this.state.sizeAux * 2) + 'vw', height: (this.state.sizeAux * 0.2) + 'vh', width: (this.state.sizeAux * 0.2) + 'vh' }}>
                        <div className={this.state.animEsperando} />
                    </div>
                    <div style={{ backgroundColor: '#1A1A1A', position: 'relative', height: this.state.sizeAux + 'vh' }}>
                        <img style={{ height: '75%', position: 'absolute', left: '0', transform: 'translateY(-50%)', top: (this.state.sizeAux / 2) + 'vh' }} src={jkpio} alt='' />
                        <div style={{ position: 'absolute', right: '0' }}>
                            <div style={{ display: 'inline-block' }} onMouseOut={() => this.restaurarBotao('Procurar')} onMouseDown={() => this.animButton('Procurar')} onMouseUp={() => this.procurarJogador()} onTouchCancel={() => this.restaurarBotao('Procurar')} onTouchStart={() => this.animButton('Procurar')} onTouchEnd={() => this.procurarJogador()}>
                                <img style={{ height: this.state.sizeAux + 'vh' }} src={this.state.buttonVersus} alt='' />
                            </div>
                            <div style={{ display: 'inline-block' }} onMouseOut={() => this.restaurarBotao()} onMouseDown={() => this.animButton('Sair')} onMouseUp={() => this.showHideAviso('sair')}>
                                <img style={{ height: this.state.sizeAux + 'vh' }} src={this.state.buttonSair} alt='' />
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#1A1A1A', position: 'relative', textAlign: 'center', height: (this.state.sizeAux / 2.2) + 'vh', width: '100%' }}>

                        <div>{this.state.oponente !== '' ?
                            <div>
                                <div style={{ display: 'inline-block' }}>
                                    <span style={{ fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: '#01FFE0', textShadow: '0px 0px 2px #01FFE0', marginRight: '10px' }}>Eu    {this.state.meuPlacar}</span>
                                </div>

                                <div style={{ display: 'inline-block' }}>
                                    <span style={{ fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: '#FFEA00', textShadow: '0px 0px 2px #FFEA00', visibility: 'visible' }}>X</span>
                                </div>

                                <div style={{ display: 'inline-block' }}>
                                    <span style={{ fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: '#FF0002', textShadow: '0px 0px 2px #FF0002', visibility: 'visible', marginLeft: '10px' }}>{this.state.placarOponente}    {this.state.oponente}</span>
                                </div>
                            </div>
                            : ''}
                        </div>


                        <input style={{ position: 'absolute' }} type='text' onChange={(e) => this.inputChange(e)}></input>
                    </div>


                    <div style={{ visibility: (this.state.animLoading === '') ? 'hidden' : 'visible', height: (this.state.sizeAux * 2) + 'vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }}>
                        <img style={{ height: (this.state.sizeAux * 1.4) + 'vh' }} src={procurandojogador} alt='' />

                        <div style={{ width: (this.state.sizeAux * 2) + 'vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
                            <div className={this.state.animLoading} />
                        </div>
                    </div>

                    <div style={{ visibility: (this.state.animContagem === '') ? 'hidden' : 'visible', height: (this.state.sizeAux * 1.5) + 'vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }}>

                        <div style={{ width: (this.state.sizeAux * 1.5) + 'vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
                            <div id='contagemAnim' className={this.state.animContagem} />
                        </div>

                    </div>

                    <img id='startAnim' src={start} style={{ visibility: (this.state.animStart === '') ? 'hidden' : 'visible', height: (this.state.sizeAux * 0.6) + 'vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }} className={this.state.animStart} alt='' />
                    <img id='endAnim' src={this.state.resultadoImg} style={{ visibility: (this.state.animEnd === '') ? 'hidden' : 'visible', height: (this.state.sizeAux * 0.8) + 'vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }} className={this.state.animEnd} alt='' />

                    <div style={{ transform: 'rotate(180deg)'}}>
                        <div className={this.state.animOpponent} />
                    </div>


                    <div id='myAnim' style={{ position: 'absolute', bottom: (this.state.sizeAux) + 'vh' }} className={this.state.anim} />






                    <div style={{ backgroundColor: '#1A1A1A', position: 'absolute', textAlign: 'center', bottom: '0', width: '100vw', height: this.state.sizeAux + 'vh' }}>
                        <div style={{ height: '100%', display: 'inline-block', marginRight: '1% ' }} onMouseOut={() => this.restaurarBotao('')} onMouseDown={() => this.animButton('Pedra')} onMouseUp={() => this.jogada('Pedra')}>
                            <img style={{ height: '100%' }} src={this.state.buttonPedra} alt='' />
                        </div>
                        <div style={{ height: '100%', display: 'inline-block' }} onMouseOut={() => this.restaurarBotao('')} onMouseDown={() => this.animButton('Papel')} onMouseUp={() => this.jogada('Papel')}>
                            <img style={{ height: '100%' }} src={this.state.buttonPapel} alt='' />
                        </div>
                        <div style={{ height: '100%', display: 'inline-block', marginLeft: '1%' }} onMouseOut={() => this.restaurarBotao('')} onMouseDown={() => this.animButton('Tesoura')} onMouseUp={() => this.jogada('Tesoura')}>
                            <img style={{ height: '100%' }} src={this.state.buttonTesoura} alt='' />
                        </div>
                    </div>
                </div>
                <div style={{ visibility: (this.state.avisoMsg === '') ? 'hidden' : 'visible', backgroundPosition: 'center', backgroundSize: 'cover', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)' }} className='aviso'>
                    <div style={{ textAlign: 'center', width: '90%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }}>
                        <span style={{ marginBottom: '4%', display: 'inline-block', fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: '#FFFFFF', textShadow: '0px 0px 1px #FFFFFF', }}>{this.state.avisoMsg}</span>
                        <div>
                            <div style={{ visibility: (this.state.avisoButton1 === '') ? 'hidden' : 'visible', cursor: 'pointer', marginRight: '4%', display: 'inline-block', fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: 'blue', textShadow: '0px 0px 1px blue', }} onMouseDown={(this.state.avisoButton1 === 'OK') ? () => this.showHideAviso('fechar') : () => this.quit('desistiu')}>{this.state.avisoButton1}</div>
                            <div style={{ visibility: (this.state.avisoButton2 === '') ? 'hidden' : 'visible', cursor: 'pointer', marginLeft: '4%', display: 'inline-block', fontSize: (this.state.sizeAux / 2.5) + 'vh', fontFamily: 'upheaval', letterSpacing: '1px', color: 'red', textShadow: '0px 0px 1px red', }} onMouseDown={() => this.showHideAviso('fechar')}>{this.state.avisoButton2}</div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    };
};

export default Game;

