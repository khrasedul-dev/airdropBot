const {Telegraf, Composer , WizardScene , Stage , session} = require("micro-bot")
const mongoose = require('mongoose')

const bot = new Composer()


//model
const settingsModel = require('./model/settingsModel')
const userModel = require('./model/userModel')

bot.use(session())


// db connection
mongoose.connect('mongodb+srv://rasedul20:rasedul20@cluster0.ax9se.mongodb.net/airdropBot?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).catch((e)=>{
        console.log(e)
}).then((d)=>console.log('Database connected')).catch((e)=>console.log(e))


const settingsId = '6211fe05c190a6ada709821e'


bot.start(ctx=>{

  const query = {
    id: settingsId
  }

  settingsModel.find(query, (e,data)=>{

      if (e) {

          console.log(e)

      } else {

        const status = parseInt(data[0].airdrop_status) 

          if(status > 0){
            
              const query = {
                userId : ctx.from.id
              }

              userModel.find(query , (e,data)=>{

                if (e) {
                    console.log(e)
                } else {
                    
                    const user_length_count = data.length

                    if (user_length_count >0) {

                          ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.from.first_name} \nWellcome Back ${ctx.botInfo.username} \n\nYou have already an account.\nPlease go to your <a href="https://t.me/airdrop_wallet454_bot"> Wallet </a>  \n\nReferral Link: \nhttps://t.me/${ctx.botInfo.username}?start=${ctx.from.id}` , {
                              reply_markup: {
                                  remove_keyboard:true
                              },
                              parse_mode: "HTML"
                          })


                    } else {

                        const referrId = ctx.startPayload

                        if (referrId) {


                              userModel.find({userId: referrId} , (e,data)=>{

                                  if (e) {

                                      console.log(e)

                                  } else {

                                      const userdata = new userModel({

                                          referr_id: referrId,
                                          userId: ctx.from.id,
                                          referr_by: data[0].name

                                      })

                                      userdata.save( (e,data)=>{

                                          if (e) {

                                              console.log(e)
                                              
                                          } else {

                                              settingsModel.find({id: settingsId},(e,data)=>{
                                                    if (e) {
                                                        console.log(e)
                                                    } else {

                                                        const join_bonus = data[0].join_bounus
                                                        const referral_bounus = data[0].referral_bounus
                                                        const coin_name = data[0].coin_name


                                                        ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.from.first_name} \nWellcome to our AirdropBot \n\n⚡ Get ${join_bonus} ${coin_name} Join Bonus \n👮 Earn ${referral_bounus} ${coin_name} for each referral \n\nComplete some tasks and win your rewards \n\nPlease tap on join button` , {
                                                          reply_markup: {
                                                              keyboard:[
                                                                  [{text: "💻 Join Airdrop"}]
                                                              ],
                                                              resize_keyboard: true
                                                          },
                                                          parse_mode: "HTML"
                                                      })

                                                    }
                                              })

                                              
                                              

                                          }

                                      } )


                                  }
                              })
                            
                    
                        } else {
                    
                          settingsModel.find({id: settingsId},(e,data)=>{
                            if (e) {
                                console.log(e)
                            } else {

                                const join_bonus = data[0].join_bounus
                                const referral_bounus = data[0].referral_bounus
                                const coin_name = data[0].coin_name


                                ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.from.first_name} \nWellcome to our AirdropBot \n\n⚡ Get ${join_bonus} ${coin_name} Join Bonus \n👮 Earn ${referral_bounus} ${coin_name} for each referral \n\nComplete some tasks and win your rewards \n\nPlease tap on join button` , {
                                        reply_markup: {
                                              keyboard:[
                                                  [{text: "💻 Join Airdrop"}]
                                              ],
                                              resize_keyboard: true
                                          },
                                          parse_mode: "HTML"
                                        })

                                    }

                              })
                    
                        }

                    }
                }

              })

          }else{
            
            ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.from.first_name} \nWellcome to our AirdropBot \n\nThe airdrop has been close.\nIf you already created account go to your wallet \nFor more update Join our <a href="https://t.me/amdg_global">Telegram group</a> . \nWe will come back soon. \n\nStay with us \nThank you` , 
              {
                  parse_mode: "HTML"

              }).catch((e)=>console.log(e))

          }
      }

  })

})




const userWizard = new WizardScene('user-wizard',
  (ctx) => {
    
    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 1:</b> \n\n1. Please join our <a href="https://t.me/amdg_global">Telegram group</a> \n2. Join our <a href="https://t.me/AMDGCommunityID">Telegram community</a> \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()
  },

  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 2:</b> \n\n1. Join our <a href="https://www.facebook.com/AssetsManagementDigitalGroup/">Facebook page</a> \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },


  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 3:</b> \n\n1. Follow our <a href="https://twitter.com/amdgsolutions">Twitter</a> \n2. Retweet a post  \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },
  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 4:</b> \n\n1. Follow on <a href="https://www.instagram.com/accounts/login/?next=/amdgsolutions/">Instagram</a> \n2. Comment in any post  \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },

  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 5:</b>\n\n1. Follow on <a href="https://www.tiktok.com/@amdgsolutions">Tiktok</a> \n2. Comment in any post  \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },
  

  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 6:</b> \n\n1. Subscribe on <a href="https://www.youtube.com/channel/UCLwQjrb14p0VBgqw9raxmPA">Youtube</a> \n2. Comment in any videos  \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },

  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 7:</b> \n\n1. Follow use on <a href="https://www.linkedin.com/company/assetmanagementdigitalgroup/">Linkedin</a> \n\nThen tap on button next` , {
        reply_markup: {
            keyboard:[
                [{text: "Next"}]
            ],
            resize_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },
  

  (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id , `<b>Task 8:</b> \n\n1. Enter your ERC-20 Crypto wallet address ` , {
        reply_markup: {
          remove_keyboard: true
        },
        parse_mode: "HTML"
    }).catch((e)=>console.log(e))

    return ctx.wizard.next()

  },
  


 (ctx) => {



    userModel.find({userId: ctx.from.id} , (e,data)=>{
      if (e) {

        console.log(e)

      } else {

        const l = data.length

        if (l>0) {

            
            settingsModel.find({id: settingsId} , (e,data)=>{

              if (e) {
                console.log(e)
              } else {
                
                    const join_bonus = data[0].join_bounus
                    const referral_bounus = parseFloat(data[0].referral_bounus)

                    const userInfoData = {
                      name: ctx.from.first_name + " " + ctx.from.last_name,
                      wallet: ctx.update.message.text,
                      balance: join_bonus,
                      ref_link: "https://t.me/"+ ctx.botInfo.username+"?start="+ctx.from.id
                    }

      
                    userModel.updateOne({userId: ctx.from.id},userInfoData,(e,data)=>{
      
                        if (e) {
                          console.log(e)
                        }else{

                            userModel.find({ userId : ctx.from.id},(e,p_user)=>{
                                if (e) {
                                    console.log(e)
                                } else {

                                    const r = p_user[0].referr_id

                                    userModel.find({userId: r},(e,d)=>{

                                        const b = parseFloat(d[0].balance) 
                                        const ref_count = parseInt(d[0].referralCount)+1

                                        

                                        const fpc = b + referral_bounus

                                        userModel.updateOne({userId:r},{balance: b + referral_bounus , referralCount:  ref_count} , (e,data)=>{
                                            if (e) {
                                                console.log(e)
                                            }
                                        })
                                    })

                                }
                            })


                        }
      
                    })

              }

            })




        } else {


            settingsModel.find({id: settingsId} , (e,data)=>{

              if (e) {
                console.log(e)
              } else {
                
                    const join_bonus = data[0].join_bounus

                    const userData = new userModel({
                        userId: ctx.from.id,
                        name: ctx.from.first_name + " " + ctx.from.last_name,
                        wallet: ctx.update.message.text,
                        balance: join_bonus,
                        ref_link: "https://t.me/"+ ctx.botInfo.username+"?start="+ctx.from.id
                    })

      
                    userData.save((e,data)=>{
                        if (e) {
                          console.log(e)
                        }
                    })
              }

            })

          
        }

      }
  })
  

    ctx.telegram.sendMessage(ctx.chat.id , `Your information: \nName: ${ctx.from.first_name} \nWallet address: ${ctx.update.message.text} \n\nThen tap on submit button` , {
      reply_markup: {
          keyboard:[
              [{text: "Submit"}]
          ],
          resize_keyboard: true
      },
      parse_mode: "HTML"
  }).catch((e)=>console.log(e))
    
    return ctx.wizard.next();
  },

  (ctx)=>{

    ctx.telegram.sendMessage(ctx.chat.id , `Congratulation your account has been created  \n\n Go to your <a href="https://t.me/airdrop_wallet454_bot"> Wallet </a> \n\nAccount Info: \nUser ID: ${ctx.from.id} \nName: ${ctx.from.first_name} \nReferrel link: \nhttps://t.me/airdropbotdemo1532_bot?start=${ctx.from.id} `,{

      reply_markup: {
        remove_keyboard: true
      },
      parse_mode: "HTML"

    }).catch((e)=>console.log(e))


    return ctx.scene.leave()
  }
)

const stage = new Stage([userWizard], { default: 'user-wizard' })

bot.use(stage)




bot.hears(["💻 Join Airdrop"], ctx=>{
    userModel.find({ userId: ctx.from.id}, (e,data)=>{
      if (e) {
        console.log(e)
      } else {
        const count = data.length
        if (count>0) {

            ctx.scene.leave().catch((e)=>console.log(e))
          
              ctx.telegram.sendMessage(ctx.chat.id , `Hello ${ctx.from.first_name} \nWellcome Back AirdropBot \n\nYou have already an account.\nPlease go to your <a href="https://t.me/airdrop_wallet454_bot"> Wallet </a>  \n\nReferral Link: \nhttps://t.me/${ctx.botInfo.username}?start=${ctx.from.id}` , {
                  reply_markup: {
                      remove_keyboard:true
                  },
                  parse_mode: "HTML"
              })


        } else {
          stage.start(ctx)
        }
      }
    })

})

   

// bot.launch()

module.exports = bot