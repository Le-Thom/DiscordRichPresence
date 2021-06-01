const DiscordRPC = require('discord-rpc'); 
const client = new DiscordRPC.Client({ transport: 'ipc' }); 
const config = require('./config.json'); 

if(!config.ID){
  console.log('\'ID de l\'application n\'est pas renseigné... Veuillez configurer le status dans le fichier config.json')
  stop()
}

client.on('ready', async () => {
  if(!config.state){
    config.state = "--"
  }
  if(!config.details){
    config.details = "--"
  }
  if(!config.largeImageKey){
    config.largeImageKey = "-"
  }
  if(!config.smallImageKey){
    config.smallImageKey = "-"
  }
  if(!config.buttons){
    await client.setActivity({
        details: config.details,
        state: config.state,
        largeImageKey: config.largeImageKey,
        smallImageKey: config.smallImageKey
    }).catch(err => console.log(err));
  }
  else{
    await client.setActivity({ 
      buttons: config.buttons,
      details: config.details,
      state: config.state,
      largeImageKey: config.largeImageKey,
      smallImageKey: config.smallImageKey
  }).catch(err => console.log(err));
  }
    console.log("Votre status à été mis à jour avec succès ! Laissez cette fenêtre ouverte tant que vous voulez afficher votre status\n ATTENTION : Votre activité de jeu doit être activée pour afficher votre status personalisé");
  });

client.login({ clientId: config.ID }).catch(console.error);


