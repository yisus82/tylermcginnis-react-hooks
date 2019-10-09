/**
 * Gets a custom error message if the given username doesn't exist
 * @param {string} message Error message
 * @param {string} username Github username
 */
const getErrorMsg = (message, username) =>
  message === 'Not Found' ? `${username} doesn't exist` : message;

/**
 * Gets the Github profile from a given username
 * @param {string} username Github username
 */
const getProfile = username =>
  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });

/**
 * Gets all the repostories from a given username
 * @param {string} username Github username
 */
const getRepos = username =>
  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });

/**
 * Sums all the stars of the user's repositories
 * @param {any[]} repos User's repositories
 */
const getStarCount = repos =>
  repos.reduce(
    (count, { stargazers_count: stargazersCount }) => count + stargazersCount,
    0
  );

/**
 * Calculates a score using followers and repositories
 * @param {number} followers User's followers
 * @param {object[]} repos User's repositories
 */
const calculateScore = (followers, repos) =>
  followers * 3 + getStarCount(repos);

/**
 * Gets player's user data
 * @param {string} player Player's username
 */
const getUserData = player =>
  Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );

/**
 * Sort players by score
 * @param {[{ profile: object; score: number; }, { profile: object; score: number; }]} players Players to sort
 */
const sortPlayers = players => players.sort((a, b) => b.score - a.score);

/**
 * Battle between players
 * @param {string[]} players Players to battle
 */
const battle = players =>
  Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  );

/**
 * Fetch popular repositories by language
 * @param {string} language
 */
const fetchPopularRepos = async language => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const res = await fetch(endpoint);
  const data = await res.json();
  if (!data.items) {
    throw new Error(data.message);
  }
  return data.items;
};

/**
 * Checks if a user exists
 * @param {string} username Github username
 */
const checkUserExists = async username => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/users?q=user:${username}`
  );

  const res = await fetch(endpoint);
  return res.ok;
};

export { fetchPopularRepos, checkUserExists, battle };
