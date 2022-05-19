local QBCore = exports['qb-core']:GetCoreObject()
local tweets, ads = {}, {}

RegisterServerEvent('kPhone-server:callContact')
AddEventHandler('kPhone-server:callContact', function(number, callid)
    local src = source
    local Ply = QBCore.Functions.GetPlayer(src)
    local Target = QBCore.Functions.GetPlayerByPhone(tostring(number))
    if Target ~= nil then
        TriggerClientEvent('kPhone-client:callContact', Target.PlayerData.source, Ply.PlayerData.charinfo.phone, callid)
    end
end)

RegisterServerEvent('kPhone-server-answerCall')
AddEventHandler('kPhone-server-answerCall', function(number)
    local Target = QBCore.Functions.GetPlayerByPhone(tostring(number))
    if Target ~= nil then
        TriggerClientEvent('kPhone-client:answerCall', Target.PlayerData.source)
    end
end)

RegisterServerEvent('kPhone-server:cancelCall')
AddEventHandler('kPhone-server:cancelCall', function(number)
    local Target = QBCore.Functions.GetPlayerByPhone(tostring(number))
    if Target ~= nil then
        TriggerClientEvent('kPhone-client:cancelCall', Target.PlayerData.source)
    end
end)

RegisterServerEvent('kPhone-server:addContact')
AddEventHandler('kPhone-server:addContact', function(data)
    local player = QBCore.Functions.GetPlayer(source)
    
    if player ~= nil then
        local result = MySQL.Sync.fetchAll('SELECT * FROM player_contacts WHERE citizenid = ?', {player.PlayerData.citizenid})
        
        if result[1] ~= nil then 
            MySQL.Async.execute('UPDATE player_contacts SET data = ? WHERE citizenid = ?', {
                json.encode(data), player.PlayerData.citizenid 
            })
        else
            MySQL.Async.insert('INSERT INTO player_contacts (citizenid, data) VALUES (?, ?)', {
                player.PlayerData.citizenid, json.encode(data)
            })
        end

    end
end)

QBCore.Functions.CreateCallback("kPhone-server:getContacts", function(source, cb)
    local player = QBCore.Functions.GetPlayer(source)

    if player ~= nil then
        local result = MySQL.Sync.fetchAll('SELECT * FROM player_contacts WHERE citizenid = ?', {player.PlayerData.citizenid})
        if result[1] ~= nil then
            cb(json.decode(result[1].data))
        else
            cb({})
        end
    end
end)

QBCore.Functions.CreateCallback("kPhone-server:getMessages", function(source, cb)
    local player = QBCore.Functions.GetPlayer(source)
    local playerMessages = {}

    if player ~= nil then
        local result = MySQL.Sync.fetchAll('SELECT * FROM phone_messages WHERE citizenid = ?', {player.PlayerData.citizenid})
        if result[1] ~= nil then
            local data = json.decode(result[1].messages)
            cb(data)
        else
            cb({})
        end
    end
end)

RegisterServerEvent('kPhone-server:sendMessage')
AddEventHandler('kPhone-server:sendMessage', function(data)
    local player = QBCore.Functions.GetPlayer(source)


    if player ~= nil then
        local result = MySQL.Sync.fetchAll('SELECT * FROM phone_messages WHERE citizenid = ?', {player.PlayerData.citizenid})
        if result[1] ~= nil then 
            MySQL.Async.execute('UPDATE phone_messages SET messages = ? WHERE citizenid = ?', {
                json.encode(data.messages), player.PlayerData.citizenid 
            })
        else
            MySQL.Async.insert('INSERT INTO phone_messages (citizenid, messages) VALUES (?, ?)', {
                player.PlayerData.citizenid, json.encode(data.messages)
            })
        end

        local toPlayer = QBCore.Functions.GetPlayerByPhone(tostring(data.messageData.receiver))
        
        if toPlayer ~=  nil then
            local toPlayerResult = MySQL.Sync.fetchAll('SELECT * FROM phone_messages WHERE citizenid = ?', {toPlayer.PlayerData.citizenid})

            if toPlayerResult[1] ~= nil then
                local playerMessageData = json.decode(toPlayerResult[1].messages)
                local index = nil
                for key, value in pairs(playerMessageData) do
                    if player.PlayerData.charinfo.phone == tostring(value.contactNumber) then
                        index = key
                    end
                end

                if index ~= nil then
                    local curData = playerMessageData[index]
                    curData.messages[#curData.messages + 1] = data.messageData
                    playerMessageData[index] = curData
                else
                    playerMessageData[#playerMessageData + 1] = {
                        contactNumber = player.PlayerData.charinfo.phone,
                        messages = {
                            data.messageData
                        }
                    }
                end

                MySQL.Async.execute('UPDATE phone_messages SET messages = ? WHERE citizenid = ?', {
                    json.encode(playerMessageData),  toPlayer.PlayerData.citizenid
                })

                TriggerClientEvent("kPhone-client:sendMessage", toPlayer.PlayerData.source, playerMessageData, player.PlayerData.charinfo.phone)

            else
                local messageDataArray = {}
                table.insert(messageDataArray, {
                    contactNumber = player.PlayerData.charinfo.phone,
                    messages = {
                        data.messageData
                    }
                })

                MySQL.Async.insert('INSERT INTO phone_messages (citizenid, messages) VALUES (?, ?)', {
                    toPlayer.PlayerData.citizenid, json.encode(messageDataArray)
                })
                TriggerClientEvent("kPhone-client:sendMessage", toPlayer.PlayerData.source, messageDataArray, player.PlayerData.charinfo.phone)

            end

            TriggerClientEvent("kPhone-client:sendNotification", toPlayer.PlayerData.source,  {
                    name = "message",
                    label = "Mesajlar",
                    message = "Yeni bir mesajınız var.",
                    color = "bg-green-500"
                }
            )
        else
            local toPlayerData = exports.oxmysql:executeSync('SELECT * FROM players WHERE charinfo LIKE ?', {'%' .. tostring(data.messageData.receiver) .. '%'})
            local toPlayerMessageResult = MySQL.Sync.fetchAll('SELECT * FROM phone_messages WHERE citizenid = ?', {toPlayerData[1].citizenid})

            if toPlayerMessageResult[1] ~= nil then
                local playerMessageData = json.decode(toPlayerMessageResult[1].messages)

                for key, value in pairs(playerMessageData) do
                    
                    if player.PlayerData.charinfo.phone == value.contactNumber then
                        table.insert(playerMessageData[key].messages, data.messageData)
                    end
                end

                MySQL.Async.execute('UPDATE phone_messages SET messages = ? WHERE citizenid = ?', {
                    json.encode(playerMessageData), toPlayerData[1].citizenid
                })
            else
                local messageDataArray = {}

                table.insert(messageDataArray, {
                    contactNumber = player.PlayerData.charinfo.phone,
                    messages = {
                        data.messageData
                    }
                })

                MySQL.Async.insert('INSERT INTO phone_messages (citizenid, messages) VALUES (?, ?)', {
                    toPlayerData[1].citizenid, json.encode(messageDataArray)
                })
            end
        end
    end
end)


RegisterServerEvent('kPhone:server-setProfilePic')
AddEventHandler('kPhone:server-setProfilePic', function(data)
    local player = QBCore.Functions.GetPlayer(source)

    if player then
        player.Functions.SetMetaData("profilepic", data)
    end
end)


RegisterNetEvent('kPhone:server-savePhoto')
AddEventHandler('kPhone:server-savePhoto', function(data)
    local player = QBCore.Functions.GetPlayer(source)

    if player then
        local playerGallery = player.PlayerData.metadata["gallery"]
        playerGallery[#playerGallery + 1] = data

        player.Functions.SetMetaData("gallery", playerGallery)

        TriggerClientEvent("kPhone-client:sendNotification", player.PlayerData.source,  {
                name = "camera",
                label = "Kamera",
                message = "Fotoğraf galeriye kayıt edildi",
                color = "bg-gray-500"
            }
        )

    end

end)

RegisterServerEvent('kPhone-server:newTweet')
AddEventHandler('kPhone-server:newTweet', function(data)
    table.insert(tweets, data)
    TriggerClientEvent("kPhone-client:updateTweets", tweets)
    TriggerClientEvent("kPhone-client:sendNotification", -1,  {
            name = "twitter",
            label = "Twitter",
            message = "@"..data.username.. " yeni bir tweet paylaştı",
            color = "bg-blue-500"
        }
    )
end)

QBCore.Functions.CreateCallback("kPhone-server:getTweets", function(source, cb)
    cb(tweets)
end)

RegisterServerEvent('kPhone-server:newAds')
AddEventHandler('kPhone-server:newAds', function(data)
    table.insert(ads, data)
    TriggerClientEvent("kPhone-client:sendNotification", -1, {
            name = "yellowpage",
            label = "Sarı Sayfalar",
            message = "Yeni bir ilan paylaşıldı",
            color = "bg-orange-500"
        }
    )
end)

QBCore.Functions.CreateCallback("kPhone-server:getAds", function(source, cb)
    cb(ads)
end)

QBCore.Functions.CreateCallback("kPhone-server:getBills", function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    local invoices = MySQL.Sync.fetchAll('SELECT * FROM phone_invoices WHERE citizenid = ?', {Player.PlayerData.citizenid})
    if invoices[1] ~= nil then
        local ino = {}
        for i = 1, #invoices, 1 do
            table.insert(ino, {
                billId = invoices[i].id,
                amount = invoices[i].amount,
                society = invoices[i].society,
            })
        end
        cb(ino)
    end
    cb({})
end)

RegisterServerEvent('kPhone-server:changeBG')
AddEventHandler('kPhone-server:changeBG', function(data)
    player = QBCore.Functions.GetPlayer(source)
    if player then
        player.Functions.SetMetaData("phoneBG", data)
    end
end)

local bannedCharacters = {'%','$',';'}
RegisterServerEvent("kPhone-server:transferMoney")
AddEventHandler("kPhone-server:transferMoney", function(data)
    local newAmount = tostring(data.amount)
    local newiban = tostring(data.account)
    for k, v in pairs(bannedCharacters) do
        newAmount = string.gsub(newAmount, '%' .. v, '')
        newiban = string.gsub(newiban, '%' .. v, '')
    end
    iban = newiban
    amount = tonumber(newAmount)
    
    local Player = QBCore.Functions.GetPlayer(source)
    if (Player.PlayerData.money.bank - amount) >= 0 then
        local query = '%"account":"' .. iban .. '"%'
        local result = exports.oxmysql:executeSync('SELECT * FROM players WHERE charinfo LIKE ?', {query})
        if result[1] ~= nil then
            local Reciever = QBCore.Functions.GetPlayerByCitizenId(result[1].citizenid)
            Player.Functions.RemoveMoney('bank', amount)
            if Reciever ~= nil then
                Reciever.Functions.AddMoney('bank', amount)
                TriggerClientEvent("kPhone-client:sendNotification", Reciever.PlayerData.source, {
                        name = "bank",
                        label = "Bank",
                        message = "Hesabına para geldi " .. amount .. ".00 $",
                        color = "from-gray-600"
                    }
                )
    
                TriggerEvent('okokBanking:AddTransferTransaction', amount, Reciever, Player.PlayerData.source)
                TriggerClientEvent('okokBanking:updateTransactions', Player.PlayerData.source, Player.PlayerData.money.bank, Player.PlayerData.money.cash)
            else
                local RecieverMoney = json.decode(result[1].money)
                RecieverMoney.bank = (RecieverMoney.bank + amount)
                exports.oxmysql:execute('UPDATE players SET money = ? WHERE citizenid = ?', {json.encode(RecieverMoney), result[1].citizenid})

                TriggerEvent('okokBanking:AddTransferTransaction', amount, Reciever, Player.PlayerData.source, Reciever.PlayerData.charinfo.firstname .. " " .. Reciever.PlayerData.charinfo.lastname, Reciever.citizenid)
				TriggerClientEvent('okokBanking:updateTransactions', source, xPlayer.PlayerData.money.bank, xPlayer.PlayerData.money.cash)
            end


            TriggerClientEvent("kPhone-client:sendNotification", Player.PlayerData.source, {
                    name = "bank",
                    label = "Bank",
                    message = "Para transferi gerçekleştirildi",
                    color = "from-gray-600"
                }
            )
        else
            TriggerClientEvent("kPhone-client:sendNotification", Player.PlayerData.source, {
                    name = "bank",
                    label = "Bank",
                    message = "Hesap bulunamadı",
                    color = "from-gray-600"
                }
            )
        end
    else
        TriggerClientEvent("kPhone-client:sendNotification", Player.PlayerData.source, {
                name = "bank",
                label = "Bank",
                message = "Hesabında yeterli bakiye yok",
                color = "from-gray-600"
            }
        )
    end

end)


RegisterServerEvent("kPhone-server:payBill")
AddEventHandler("kPhone-server:payBill", function(id)
    local player = QBCore.Functions.GetPlayer(source)


    local result = MySQL.Sync.fetchAll('SELECT * FROM phone_invoices WHERE id = ?', {id})
    if result then
        if result[1].amount <= player.PlayerData.money["bank"] then
            player.Functions.RemoveMoney("bank", result[1].amount)
            MySQL.Async.execute('DELETE FROM phone_invoices WHERE id = ?', {id})
            player.Functions.notify("Fatura ödendi", "inform")

            TriggerClientEvent("kPhone-client:updateBills", player.PlayerData.source)
        else
            player.Functions.notify("Yeterli paran yok.", "error")
        end
    end
end)

RegisterServerEvent("kPhone-server:sendMails")
AddEventHandler("kPhone-server:sendMails", function(data)
    local player = QBCore.Functions.GetPlayer(source)

    local mails = MySQL.Sync.fetchAll('SELECT * FROM player_mails WHERE citizenid = ?', {player.PlayerData.citizenid})

    if mails[1] ~= nil then
        mails = json.decode(mails[1].data)
        table.insert(mails, data)

        MySQL.Async.execute('UPDATE player_mails SET data = ? WHERE citizenid = ?', {
            json.encode(mails), player.PlayerData.citizenid
        })
    else
        mails = { data }
        MySQL.Async.insert('INSERT INTO player_mails (citizenid, data) VALUES (?, ?)', {
            player.PlayerData.citizenid, json.encode(mails)
        })
    end
end)

QBCore.Functions.CreateCallback("kPhone-server:getMails", function(source, cb)
    local player = QBCore.Functions.GetPlayer(source)

    if player then 
        local mails = MySQL.Sync.fetchAll('SELECT * FROM player_mails WHERE citizenid = ?', {player.PlayerData.citizenid})
        if mails[1] then
            cb(json.decode(mails[1].data))
        else
            cb({})
        end
    end
    
end)