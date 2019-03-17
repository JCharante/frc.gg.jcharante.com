<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="purple"
                text-color="white"
                v-if="isScheduledMatch">
        {{ matchOutcome === 'Tie' ? 'T' : (matchOutcome === 'Victory' ? 'W' : 'L') }}
      </q-avatar>
      <q-avatar v-else
                :color="matchOutcome === 'Tie'
                        ? 'grey'
                        : (
                            matchOutcome === 'Victory'
                            ? 'blue'
                            : 'red')"
                text-color="white">
        {{ matchOutcome === 'Tie' ? 'T' : (matchOutcome === 'Victory' ? 'W' : 'L') }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item>
        <q-item-section>
          <q-item-label>{{ eventName }} - {{ matchName }}
            (<a :href="'https://www.thebluealliance.com/match/' + data.key"
                target="_blank">view on TBA</a>)
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section v-if="$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b v-if="!isScheduledMatch">
                    {{ data.winner === 'red' ? 'Victory' : 'Defeat' }}</b>
                  (Red Alliance)
                  (<b>{{ data.red_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="red"
                            :data="data.red0"
                            :active="data.red0.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red1"
                            :active="data.red1.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red2"
                            :active="data.red2.team === protagonist"/>
          </q-list>
        </q-item-section>

        <q-item-section v-if="$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b v-if="!isScheduledMatch">
                    {{ data.winner === 'blue' ? 'Victory' : 'Defeat' }}</b>
                  (Blue Alliance)
                  (<b>{{ data.blue_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="blue"
                            :data="data.blue0"
                            :active="data.blue0.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue1"
                            :active="data.blue1.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue2"
                            :active="data.blue2.team === protagonist"/>
          </q-list>
        </q-item-section>

        <q-item-section v-if="!$q.screen.gt.xs">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b v-if="!isScheduledMatch">
                    {{ data.winner === 'red' ? 'Victory' : 'Defeat' }}</b>
                  (Red Alliance)
                  (<b>{{ data.red_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="red"
                            :data="data.red0"
                            :active="data.red0.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red1"
                            :active="data.red1.team === protagonist"/>
            <new-team-entry alliance="red"
                            :data="data.red2"
                            :active="data.red2.team === protagonist"/>
          </q-list>

          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <b v-if="!isScheduledMatch">
                    {{ data.winner === 'blue' ? 'Victory' : 'Defeat' }}</b>
                  (Blue Alliance)
                  (<b>{{ data.blue_win_probability.toLocaleString("en", {style: "percent"})}}</b>)
                </q-item-label>
              </q-item-section>
            </q-item>

            <new-team-entry alliance="blue"
                            :data="data.blue0"
                            :active="data.blue0.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue1"
                            :active="data.blue1.team === protagonist"/>
            <new-team-entry alliance="blue"
                            :data="data.blue2"
                            :active="data.blue2.team === protagonist"/>
          </q-list>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-item>
</template>

<script>
import avatars from '../assets/avatars.json';
import extra from '../assets/extra.json';
import NewTeamEntry from './NewTeamEntry.vue';

export default {
  name: 'NewMatch',
  components: {
    NewTeamEntry,
  },
  props: ['data', 'protagonist'],
  computed: {
    matchOutcome() {
      let protagonistTeam = null;
      if (this.data.red0.team === this.protagonist
       || this.data.red1.team === this.protagonist
       || this.data.red2.team === this.protagonist) {
        protagonistTeam = 'red';
      }
      if (this.data.blue0.team === this.protagonist
       || this.data.blue1.team === this.protagonist
       || this.data.blue2.team === this.protagonist) {
        protagonistTeam = 'blue';
      }
      if (this.data.status === 'completed') {
        if (this.data.winner === '') {
          return 'Tie';
        }
        if (this.data.winner === protagonistTeam) {
          return 'Victory';
        }
        return 'Defeat';
      }
      // Match is in the future, must predict
      if (this.data.red_win_probability > this.data.blue_win_probability) {
        return protagonistTeam === 'red' ? 'Victory' : 'Defeat';
      }
      if (this.data.blue_win_probability > this.data.red_win_probability) {
        return protagonistTeam === 'blue' ? 'Victory' : 'Defeat';
      }
      return 'Tie';
    },
    protagonistWon() {
      let protagonistOnRed = false;
      protagonistOnRed = this.protagonist === this.data.red0.team ? true : protagonistOnRed;
      protagonistOnRed = this.protagonist === this.data.red1.team ? true : protagonistOnRed;
      protagonistOnRed = this.protagonist === this.data.red2.team ? true : protagonistOnRed;
      return (protagonistOnRed && this.data.winner === 'red')
              || (!protagonistOnRed && this.data.winner === 'blue');
    },
    eventName() {
      if (this.data.event_code in extra.eventNicknames) {
        return extra.eventNicknames[this.data.event_code];
      }
      return this.data.event_code;
    },
    matchName() {
      return this.data.key.split('_')[1];
    },
    isScheduledMatch() {
      return this.data.status === 'scheduled';
    },
  },
  methods: {
    hasAvatar(team) {
      return team in avatars;
    },
    getAvatar(team) {
      return avatars[team];
    },
  },
};
</script>

<style scoped lang="stylus">
 .active-team-link
    color white
    background gray
</style>
