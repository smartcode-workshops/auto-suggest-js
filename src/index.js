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
        output: process.stdout,
        terminal: true
    });
    let running = true;
    let prefix = "";
    let sb = [];
    let words = null;
    let wordsIndex = 0;
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (!running) return;
        switch(key.name) {
            case 'space':
                process.stdout.write(' ');
                prefix = "";
                sb.push(' ');
                break;
            case 'backspace':
                if (sb.length > 0) {
                    process.stdout.write('\b \b');
                    sb.pop();
                    prefix = sb.join('').split(' ').pop() || "";
                }
                break;
            case 'return':
                process.stdout.write('\n');
                running = false;
                rl.close();
                break;
            case 'tab':
                if (prefix.length > 1) {
                    // Prevent default tab behavior
                    key.preventDefault?.();
                    // Clear the current line before completion
                    process.stdout.write('\r' + ' '.repeat(process.stdout.columns));
                    process.stdout.write('\r');
                    let currentInput = sb.join('');
                    let previousWord = currentInput.split(' ').pop() || "";
                    
                    // Refresh words list if needed
                    if (!words || previousWord !== words[wordsIndex - 1]) {
                        words = dictionary.autoSuggest(prefix);
                        wordsIndex = 0;
                    }
                    // Rewrite the current input up to the prefix
                    let inputBeforeCompletion = currentInput.slice(0, currentInput.lastIndexOf(previousWord));
                    process.stdout.write(inputBeforeCompletion);
                    // Add new word completion
                    if (words && words.length > 0) {
                        const output = words[wordsIndex];
                        wordsIndex = (wordsIndex + 1) % words.length;
                        process.stdout.write(output);
                        
                        // Reset state
                        sb = (inputBeforeCompletion + output).split('');
                        prefix = prefix;
                    }
                }
                break;
            default:
                // Ensure only single characters are processed
                if (str && str.length === 1 && !key.ctrl && !key.meta) {
                    // Remove the duplicate character writing
                    sb.push(str);
                    prefix += str;
                    words = null;
                    wordsIndex = 0;
                }
        }
    });
    // Ensure input is possible
    process.stdin.on('data', (chunk) => {
        // Do nothing - just keep the input channel open
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