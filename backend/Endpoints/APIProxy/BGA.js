import axios from 'axios';

export const boardGameData = async (req, res) => {
	const accessToken = req.header("Authorization");
  let cancelToken;
	if (accessToken) {
		const { searchParameter } = req.body;
    if (searchParameter) {
			const BGA_API = `https://api.boardgameatlas.com/api/search?name=${searchParameter}&limit=100&client_id=${process.env.BGA_CLIENT_ID}`;

      if (cancelToken) {
        cancelToken.cancel("Fetch cancelled due to new request")
      }

      cancelToken = axios.CancelToken.source();

      let response;
      try {
        response = await axios.get(
          BGA_API, { canceltoken: cancelToken.token}
        )
        if (response) {
          const info = response.data.games
          const baseGames = info.filter((game) => game.type === 'game');

          res.status(200).json({
            success: true,
            searchParameter: searchParameter,
            response: baseGames
          });
				};
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.stack,
        });
      }

      /* try {

        const response = await fetch(BGA_API);
        if (response) {
					const gameData = await response.json();
          const info = gameData.games;
          const baseGames = info.filter((game) => game.type === 'game');

          res.status(200).json({
            success: true,
            searchParameter: searchParameter,
            response: baseGames
          });
				};
      } catch (error) {
        console.warn(error.message)
        res.status(400).json({
          success: false,
          response: error.stack,
          banan: true
        });
      } */
		} else {
			res.status(400).json({
				success: false,
				response: "Please provide searchParameter"
			});
		};
	} else {
		res.status(401).json({
			success: false,
			response: "Please log in"
		});
	};
};