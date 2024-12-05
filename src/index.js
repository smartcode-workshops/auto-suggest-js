const readline = require('readline');
const { Trie } = require('./trie'); // Assuming Trie class is implemented in Trie.js

const words = [
    "as", "astronaut", "asteroid", "are", "around",
    "cat", "cars", "cares", "careful", "carefully",
    "for", "follows", "forgot", "from", "front",
    "mellow", "mean", "money", "monday", "monster",
    "place", "plan", "planet", "planets", "plans",
    "the", "their", "they", "there", "towards"
];

const dictionary = initializeTrie(words);

function initializeTrie(words) {
    const trie = new Trie();
    words.forEach(word => trie.insert(word));
    return trie;
}

function searchWord() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask() {
        rl.question('Enter a word to search for, or press Enter to exit.\n', (input) => {
            if (input === "") {
                rl.close();
            } else {
                /*
                if (input && dictionary.search(input)) {
                    console.log(`Found "${input}" in dictionary`);
                }
                
                else {
                */
                    console.log(`Did not find "${input}" in dictionary`);
               //}
                ask();
            }
        });
    }

    ask();
}

function prefixAutocomplete() {
    printTrie(dictionary);
    getPrefixInput();
}

function deleteWord() {
    printTrie(dictionary);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask() {
        rl.question('\nEnter a word to delete, or press Enter to exit.\n', (input) => {
            if (input === "") {
                rl.close();
            } else {
                /*
                if (input && dictionary.search(input)) {
                    dictionary.delete(input);
                    console.log(`Deleted "${input}" from dictionary\n`);
                    printTrie(dictionary);
                }
                
                else {
                */
                    console.log(`Did not find "${input}" in dictionary`);
                //}
                ask();
            }
        });
    }

    ask();
}

function getSpellingSuggestions() {
    printTrie(dictionary);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\nEnter a word to get spelling suggestions for, or press Enter to exit.\n', (input) => {
        if (input) {
            const similarWords = dictionary.getSpellingSuggestions(input);
            console.log(`Spelling suggestions for "${input}":`);
            if (similarWords.length === 0) {
                console.log("No suggestions found.");
            } else {
                similarWords.forEach(word => console.log(word));
            }
        }
        rl.close();
    });
}

function runAllExercises() {
    searchWord();
    prefixAutocomplete();
    deleteWord();
    getSpellingSuggestions();
}

function getPrefixInput() {
    console.log("\nEnter a prefix to search for, then press Tab to cycle through search results. Press Enter to exit.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let running = true;
    let prefix = "";
    let sb = [];
    let words = null;
    let wordsIndex = 0;

    process.stdin.on('keypress', (char, key) => {
        if (key.name === 'space') {
            process.stdout.write(' ');
            prefix = "";
            sb.push(' ');
        } else if (key.name === 'backspace' && process.stdout.cursorTo > 0) {
            process.stdout.cursorTo(process.stdout.cursorTo - 1);
            process.stdout.write(' ');
            process.stdout.cursorTo(process.stdout.cursorTo - 1);

            sb.pop();
            prefix = sb.join('').split(' ').pop();
        } else if (key.name === 'return') {
            console.log();
            running = false;
            rl.close();
        } else if (key.name === 'tab' && prefix.length > 1) {
            const previousWord = sb.join('').split(' ').pop();

            if (words) {
                if (previousWord !== words[wordsIndex - 1]) {
                    words = dictionary.autoSuggest(prefix);
                    wordsIndex = 0;
                }
            } else {
                words = dictionary.autoSuggest(prefix);
                wordsIndex = 0;
            }

            for (let i = prefix.length; i < previousWord.length; i++) {
                process.stdout.cursorTo(process.stdout.cursorTo - 1);
                process.stdout.write(' ');
                process.stdout.cursorTo(process.stdout.cursorTo - 1);
                sb.pop();
            }

            if (words.length > 0 && wordsIndex < words.length) {
                const output = words[wordsIndex++];
                process.stdout.write(output.substring(prefix.length));
                sb.push(...output.substring(prefix.length));
            }
        } else if (key.name !== 'tab') {
            process.stdout.write(char);
            prefix += char;
            sb.push(char);
            words = null;
            wordsIndex = 0;
        }
    });
}

function printTrie(trie) {
    console.log("The dictionary contains the following words:");
    const words = trie.getAllWords();
    console.log(words.join(', '));
}

printTrie(dictionary);
// searchWord();
// prefixAutocomplete();
// deleteWord();
// getSpellingSuggestions();