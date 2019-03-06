<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar color="blue" text-color="white" font-size="0.9rem">
        W
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item>
        <q-item-section>
          <q-item-label>Granite State District Event - Finals 2</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label><b>Victory</b> (Red Alliance) (<b>86%</b>)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active active-class="active-team-link">
              <q-item-section avatar>
                <q-avatar square color="red">
                  <img :src="getAvatar('5687')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>5687 (Master)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-avatar square color="red">
                  <img :src="getAvatar('1519')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>1519 (Grandmaster)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-avatar square color="red">
                  <img :src="getAvatar('7416')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>7416 (Gold II)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>

        <q-item-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label><b>Defeat</b> (Blue Alliance) (<b>14%</b>)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item active-class="active-team-link">
              <q-item-section avatar>
                <q-avatar square color="blue">
                  <img :src="getAvatar('88')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>88 (Diamond IV)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-avatar square color="blue">
                  <img :src="getAvatar('4761')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>4767 (Diamond III)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-avatar square color="blue">
                  <img :src="getAvatar('1277')">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>1277 (Gold III)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-item>
</template>

<script>
import avatars from '../assets/avatars.json';

export default {
  name: 'NewMatch',
  props: ['data', 'protagonist'],
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
