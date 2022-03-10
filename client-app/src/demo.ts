export interface Duck{
     Name : string;
     Sound : string;
     LegsNubmer : number;
     makeASound : () => void;
}
const duck1: Duck = {
    Name : "ducky",
    Sound : "hello",
    LegsNubmer : 2,
    makeASound : () => console.log(duck1.Sound)
}
const duck2: Duck = {
    Name : "duckyDuck",
    Sound : "Bonjur",
    LegsNubmer : 2,
    makeASound : () => console.log(duck2.Sound)
}
const duck666: Duck = {
    Name : "EvilDuck",
    Sound : "HELLFIRE",
    LegsNubmer : 666,
    makeASound : () => console.log(duck666.Sound)
}
export const ducks = [duck1,duck2,duck666]