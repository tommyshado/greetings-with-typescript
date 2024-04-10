import GreetIn from "./GreetIn";
import Greetable from "./GreetableInt";
import { Language } from "./Language";
import UserGreetCounter from "./UserGreetCounterInt";

export class GreetInXhosa implements GreetIn {
    greet(name: string): string {
        return `Molo ${name}`;
    }
};

export class GreetInEnglish implements GreetIn {
    greet(name: string): string {
        return `Hello ${name}`;
    }
};

export class GreetInTswana implements GreetIn {
    greet(name: string): string {
        return `Dumela ${name}`;
    }
};

export default class Greeter implements Greetable {
    private greetable: Greetable;
    private userGreetCounter: UserGreetCounter

    constructor(greetable: Greetable, userGreetCounter: UserGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }

    greet(name: string, chosenLanguage: Language) {
        let message = this.greetable.greet(name, chosenLanguage);
        this.userGreetCounter.countGreet(name);
        return message;
    };

    public get greetCounter(): Promise<number> {
        return (async () => {
            return await this.userGreetCounter.greetCounter;
        })();
    };

    async userGreetCount(firstName: string): Promise<number> {
        return await this.userGreetCounter.userGreetCount(firstName);
    };
}

export class GreetInManager implements Greetable {
    constructor(private greetLanguages: Map<Language, GreetIn>) {
        this.greetLanguages = greetLanguages;
    };

    greet(firstName: string, language: Language): string {
        let greetIn = this.greetLanguages.get(language);

        if (greetIn) {
            return greetIn.greet(firstName);
        };
        return "";
    }
};