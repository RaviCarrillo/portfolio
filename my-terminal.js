const url = 'https://v2.jokeapi.dev/joke/Programming';
const commands = {
    async joke() {
        const res = await fetch(url);
        const data = await res.json();
        (async () => {
            if (data.type == 'twopart') {
                // we set clear the prompt to don't have any
                // flashing between animations
                const prompt = this.get_prompt();
                this.set_prompt('');
                // as said before in every function, passed directly
                // to terminal, you can use `this` object
                // to reference terminal instance
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
                // we restore the prompt
                this.set_prompt(prompt);
            } else if (data.type === 'single') {
                await this.echo(data.joke, {
                    delay: 50,
                    typing: true
                });
            }
        })();
    },
}