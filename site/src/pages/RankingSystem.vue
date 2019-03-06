<template>
  <q-page>
    <p>So how does the ranking system work?</p>
    <p>Occasionally, a python script runs which fetches information from
    The Blue Alliance API. This fetches all the teams for each event, and then all
    the matches for the event. Then each match is individually processed according
    to its timestamp.</p>
    <p>
      When each team is imported into the script, it is given a default ranking of 1500,
      which is roughly Gold III. I use the TrueSkill library
      with a mu of 1500, a sigma of 500, and a beta of 250.
      Currently, each match is a 3v3, and only the match outcome (win, lose, or tie) is taken
      into account. In the future, we hope to take into account different attributes from the
      match to generate higher quality rankings.
    </p>
    <p>
      Finally, the script exports all its data into a JSON file, and that JSON file is included with
    this Single Page Application. This website is a Single Page Application because
    I don't want to have to bother with anything more complicated than a static site.</p>
  </q-page>
</template>

<script>
export default {
  name: 'RankingSystem',
};
</script>

<style scoped>

</style>
