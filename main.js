javascript:(function() {
    const convertTimeToSeconds = (time) => {
        const [minutes, seconds] = time.split(':').map(Number);
        const totalSeconds = (minutes * 60) + seconds;
        return totalSeconds;
    };

    const container = document.querySelector("#contents > ytmusic-shelf-renderer:nth-child(2)");
    const itens = container.querySelectorAll("ytmusic-responsive-list-item-renderer");

    const musics = [];

    itens.forEach((item, index) => {
        const element = item.querySelector("yt-formatted-string:nth-child(2) > a");

        const title = item.querySelector("yt-formatted-string > a").textContent;
        const artist = item.querySelector("div.secondary-flex-columns.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string:nth-child(1) > a").textContent;
        const album = element ? element.textContent : '';
        const time = convertTimeToSeconds(item.querySelector("div.fixed-columns.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string").textContent);

        musics.push({ index, title, artist, album, time });

        musics.sort((a, b) => b.index - a.index);
    });

    const saveJSON = (data) => {
        const filename = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10) + '.json';
        const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    };

    saveJSON(musics);
})();
