// src/types/react-slick.d.ts
declare module 'react-slick' {
    import { Component } from 'react';

    interface SlickProps {
        dots?: boolean;
        infinite?: boolean;
        speed?: number;
        slidesToShow?: number;
        slidesToScroll?: number;
        autoplay?: boolean;
        autoplaySpeed?: number;
        arrows?: boolean;
        [key: string]: unknown; // Boshqa parametrlar uchun umumiy kirish
    }

    export default class Slider extends Component<SlickProps> {}
}
