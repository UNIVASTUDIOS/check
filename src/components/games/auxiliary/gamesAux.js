import ludoImg from '../../../assets/images/ludoGame.png'
import chessImg from '../../../assets/images/ChessGames.svg'
import scrabbleImg from '../../../assets/images/ScrabbleGames.svg'
import whotImg from '../../../assets/images/WhotGames.svg'
import snookerImg from '../../../assets/images/SnookerBoard.svg'

import userProfile1 from '../../../assets/images/userProfile1.png'
import userProfile2 from '../../../assets/images/userProfile2.png'
import userProfile3 from '../../../assets/images/userProfile3.png'
import userProfile4 from '../../../assets/images/userProfile4.png'
import userProfile5 from '../../../assets/images/userProfile5.png'
import userProfile6 from '../../../assets/images/userProfile6.png'



export const allGames = [
    {
        id: 'snooker',
        img: snookerImg,
        bgClass: 'bg-73CD02',
        arrowColor: '#73CD02',
        title: 'Snooker Board',
        splitTitle1: 'Snooker',
        splitTitle2: 'Board',
        caption: 'Play snooker with friends'
    },
    {
        id: 'chess',
        img: chessImg,
        bgClass: 'bg-2796CE',
        arrowColor: '#2796CE',
        title: 'Chess Game',
        splitTitle1: 'Chess',
        splitTitle2: 'Game',
        caption: 'Play chess with friends',
        text: "Ludo is a classic board game for 2-4 players, where the goal is to race four tokens from start to finish based on die rolls. It's a game of strategy and luck."
    },
    {
        id: 'ludo',
        img: ludoImg,
        bgClass: 'bg-FBBC04',
        arrowColor: '#FBBC04',
        title: 'Ludo King',
        splitTitle1: 'Ludo',
        splitTitle2: 'King',
        caption: 'Play ludo with friends',
        text: "Ludo is a classic board game for 2-4 players, where the goal is to race four tokens from start to finish based on die rolls. It's a game of strategy and luck."
    },
    {
        id: 'whot',
        img: whotImg,
        bgClass: 'bg-903A39',
        arrowColor: '#903A39',
        title: 'Whot Card',
        splitTitle1: 'Whot',
        splitTitle2: 'Card',        
        caption: 'Play whot with friends',
        text: "Ludo is a classic board game for 2-4 players, where the goal is to race four tokens from start to finish based on die rolls. It's a game of strategy and luck."
    },
    {
        id: 'scrabble',
        img: scrabbleImg,
        bgClass: 'bg-EAD3AB',
        arrowColor: '#EAD3AB',
        title: 'Scrabble Game',
        splitTitle1: 'Scrabble',
        splitTitle2: 'Game',
        caption: 'Play scrabble with friends',
        text: "Ludo is a classic board game for 2-4 players, where the goal is to race four tokens from start to finish based on die rolls. It's a game of strategy and luck."
    },
]

export const allUsers = [
    {
        user_id: 1,
        name: 'SteshaCr',
        wins: 230,
        profile: userProfile1,
        bgClass: 'bg-FD8D84'
    },
    {
        user_id: 2,
        name: 'JosephX',
        wins: 300,
        profile: userProfile2,
        bgClass: 'bg-84FDA6'
    },
    {
        user_id: 3,
        name: 'DaniX',
        wins: 150,
        profile: userProfile3,
        bgClass: 'bg-B1DEFF'
    },
    {
        user_id: 4,
        name: 'Clar8',
        wins: 20,
        profile: userProfile4,
        bgClass: 'bg-C59AFC'
    },
    {
        user_id: 5,
        name: 'James Dan',
        wins: 100,
        profile: userProfile5,
        bgClass: 'bg-FFD2B1'
    },
    {
        user_id: 6,
        name: 'Diamond',
        wins: 60,
        profile: userProfile6,
        bgClass: 'bg-C5F8FF'
    },
]