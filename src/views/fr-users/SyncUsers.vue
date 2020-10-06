<template>
  <div>
    <v-dialog
      :value="isShowPopup"
      max-width="1000px"
      max-height="1000px"
      @click:outside="closePopup"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('message.syncUser') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="syncForm">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="selectedDevices"
                    :items="['SK-111']"
                    label="Sync To Devices"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn class="px-4" color="success" @click="syncUsers()">
                  Create Users
                </v-btn>
                <v-btn class="px-4" color="error" @click="closePopup()">
                  Close
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: ['isShowPopup', 'connectedDevices'],
  data() {
    return {
      selectedDevices: []
    }
  },
  mounted() {},
  computed: {},
  methods: {
    async syncUsers() {
      try {
        await Promise.all(
          this.selectedDevices.map(device => {
            return this.$axios.post('/sync/users/from/device', null, {
              params: { deviceId: device }
            })
          })
        )

        Vue.notify({
          group: 'loggedIn',
          type: 'success',
          text: 'Sync users success!'
        })
      } catch (error) {
        Vue.notify({
          group: 'loggedIn',
          type: 'error',
          text: 'Error when sync users!'
        })
      }
    },
    closePopup() {
      this.$emit('closePopup', true)
    }
  }
}
</script>

<style></style>
