window.party = window.party || {};

(function () {
    $(document).ready(function(){
        $.get('wordlist.txt', function(data) {
            party.words = data.split('\n');
            console.log(party.words.length);
        });
    });

    function nextWord(){
        if (!party.words) {
            return "No words found.";
        }

        var i = Math.floor(Math.random() * (party.words.length-1)); 
        return party.words[i];
    }

    party.nextWord = nextWord;
})();
