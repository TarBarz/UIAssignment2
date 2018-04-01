var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");

var ding = document.getElementById("ding");
var shoo = document.getElementById("shoo");
var bimp = document.getElementById("bimp");
var fip = document.getElementById("fip");
var whirr = document.getElementById("whirr");

surface.font = "50px Arial Black";
surface.textAlign = "center";

var lv = 9;
var currentXP = 960;
var maxXP = 2000;
var currentHP = 340;
var maxHP = 900;
var currentMP = 80;
var maxMP = 165;
var atk = 21;
var def = 18;
var spd = 26;
var gold = 1200;

var itemArray = [{id: 0, img: "itemicon1", name: "Health Potion", qty: 3, price: 35, desc: "A potent healing potion brewed by a witch.", effectdesc: "HP +400"},
{id: 1, img: "itemicon2", name: "Magic Potion", qty: 2, price: 30, desc: "A powerful brew that restores magic power.", effectdesc: "MP +50"},
{id: 2, img: "itemicon3", name: "Attack Boost", qty: 1, price: 180, desc: "A magic sigil that boosts strength permanently.", effectdesc: "ATK +2"},
{id: 3, img: "itemicon4", name: "Defence Boost", qty: 1, price: 180, desc: "A magic sigil that boosts defence permanently.", effectdesc: "DEF +2"},
{id: 4, img: "itemicon5", name: "Gold Coin", qty: 1, price: 500, desc: "A coin with no practical use.", effectdesc: "N/A"},
{id: 5, img: "itemicon6", name: "Super Potion", qty: 0, price: 200, desc: "A strong, versatile, and rare potion.", effectdesc: "HP +500, MP +100"}];

var item0img = new Image();
item0img.src = "img/" + itemArray[0].img + ".png";
var item1img = new Image();
item1img.src = "img/" + itemArray[1].img + ".png";
var item2img = new Image();
item2img.src = "img/" + itemArray[2].img + ".png";
var item3img = new Image();
item3img.src = "img/" + itemArray[3].img + ".png";
var item4img = new Image();
item4img.src = "img/" + itemArray[4].img + ".png";
var item5img = new Image();
item5img.src = "img/" + itemArray[5].img + ".png";

var armourArray = [{id: 0, img: "armouricon0", name: "Silk Dress", desc1: "A fashionable, lightweight silk dress.", desc2:"", atkplus: 0, defplus: 5, spdplus: 18},
	{id: 1, img: "armouricon1", name: "Magic Robe", desc1: "A defensive robe popular with young", desc2: "women in the kingdom.", atkplus: 0, defplus : 15, spdplus: 2},
	{id: 2, img: "armouricon2", name: "Chainmail Armour", desc1: "Heavy armour that protects the user but", desc2: "slows them down.", atkplus: 0, defplus: 25, spdplus: -10}];

var armour0img = new Image();
armour0img.src = "img/" + armourArray[0].img + ".png";
var armour1img = new Image();
armour1img.src = "img/" + armourArray[1].img + ".png";
var armour2img = new Image();
armour2img.src = "img/" + armourArray[2].img + ".png";
	
var weaponArray = [{id: 0, img: "weaponicon0", name: "Bronze Sword", desc1: "A common, basic, lightweight shortsword.", desc2: "", atkplus: 10, defplus: 0, spdplus: 2},
	{id: 1, img: "weaponicon1", name: "Iron Bow", desc1: "A heavy, long-range bow forged by", desc2: " mountain elves.", atkplus: 12, defplus: 0, spdplus: -3},
	{id: 2, img: "weaponicon2", name: "Dragonsword", desc1: "An extremely powerful but bulky greatsword", desc2: " forged from dragon scales.", atkplus: 25, defplus: 0, spdplus: -15}];

var weapon0img = new Image();
weapon0img.src = "img/" + weaponArray[0].img + ".png";
var weapon1img = new Image();
weapon1img.src = "img/" + weaponArray[1].img + ".png";
var weapon2img = new Image();
weapon2img.src = "img/" + weaponArray[2].img + ".png";

var equippedArmour = 0;
var equippedWeapon = 0;
	
var missionArray = [{id:0, name: "To the Palace!", desc1: "Get to the palace to meet the princess!", desc2: "", crucial: true},
	{id: 1, name: "The Swamp Monsters", desc1: "Orcs have been terrorising the swamp. Deal", desc2: "with them. Slay five Moss Orcs in the swamp.", crucial: false},
	{id: 2, name: "The Witch's Ingredients", desc1: "The village witch offered to brew you a potion if", desc2: "you bring her five healing herbs.", crucial: false},
	{id: 3, name: "The Haunted House", desc1: "The villagers say the old house East of town is", desc2: "haunted. Investigate it and find the truth.", crucial: false}];	

var arrow = new Image();
arrow.src = "img/selectionarrow.png";
var arrowLocation;
var specialArrow = new Image();
specialArrow.src = "img/specialarrow.png";
var sideArrow = new Image();
sideArrow.src = "img/selectionarrowside.png";

var importantOrb = new Image();
importantOrb.src = "img/crucialorb.png";
var optionalOrb = new Image();
optionalOrb.src = "img/noncrucialorb.png";
var playerArrow = new Image();
playerArrow.src = "img/playerarrow.png";

var map = new Image();
map.src = "img/map.png";

var qtyToBuy;

var specialArrowLocation;
var gearSelect = 0;

var currentScreen; //assign id numbers to each screen

window.addEventListener("keydown", keyDown);

StartHudScreen();

function StartInventoryScreen()
{
	arrowLocation = 0;
	specialArrowLocation = 0;
	currentScreen = 1;
	DrawInventoryScreen();
}

function StartGearScreen()
{
	arrowLocation = 3;
	specialArrowLocation = 0;
	currentScreen = 2;
	gearSelect = 0;
	DrawGearScreen();
}

function StartMissionScreen()
{
	arrowLocation = 0;
	currentScreen = 3;
	DrawMissionScreen();
}

function StartMapScreen()
{
	currentScreen = 4;
	DrawMapScreen();
}

function StartPauseScreen()
{
	currentScreen = 0;
	arrowLocation = 0;
	DrawPauseScreen();
}

function StartShopScreen()
{
	currentScreen = 5;
	arrowLocation = 0;
	specialArrowLocation = 0;
	qtyToBuy = 1;
	DrawShopScreen();
}

function StartHudScreen()
{
	currentScreen = 6;
	DrawHudScreen();
}

function DrawInventoryScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.fillRect(220, 130, 840, 250); //inventory background rectangle
	surface.beginPath();
	surface.lineWidth = 3;
	surface.rect(220, 130, 840, 250);
	surface.stroke();
	
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();

	surface.fillRect(320,400,640,100); //item name
	surface.rect(320, 400, 640, 100);
	surface.stroke();
	
	surface.fillRect(180, 400, 100, 100);
	surface.rect(180, 400, 100, 100); //icon
	surface.stroke();
	
	surface.fillRect(180, 520, 780, 100);
	surface.rect(180, 520, 780, 100); //description
	surface.stroke();
	
	surface.fillRect(980, 400, 260, 60);
	surface.rect(980, 400, 260, 60); //# held
	surface.stroke();
	
	surface.fillRect(980, 480, 260, 60)
	surface.rect(980, 480, 260, 60); //USE/DISCARD boxes
	surface.fillRect(980, 560, 260, 60);
	surface.rect(980, 560, 260, 60);
	surface.stroke();
	
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);
	
	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.fillText("INVENTORY", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("PAUSE", 170, 75);
	surface.fillText("GEAR", 1110, 75);
	surface.fillText("USE", 1110, 525);
	surface.fillText("DISCARD", 1110, 605);

	
	if (arrowLocation <=5 && itemArray[arrowLocation].qty != 0)
	{
		surface.fillText(itemArray[arrowLocation].name,640,460);
		switch (arrowLocation)
		{
			case 0:
				item0img.onload = function()
				{
					surface.drawImage(item0img, 180, 400, 100, 100);
					if (itemArray[0].qty != 0)
						surface.drawImage(item0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
				};
				surface.drawImage(item0img, 180, 400, 100, 100);
				break;
			case 1:
				surface.drawImage(item1img, 180, 400, 100, 100);
				break;
			case 2:
				surface.drawImage(item2img, 180, 400, 100, 100);
				break;
			case 3:
				surface.drawImage(item3img, 180, 400, 100, 100);
				break;
			case 4:
				surface.drawImage(item4img, 180, 400, 100, 100);
				break;
			case 5:
				surface.drawImage(item5img, 180, 400, 100, 100);
				break;				
		}
		surface.fillText("HELD: "+itemArray[arrowLocation].qty, 1110, 445);
		surface.font = "20px Arial Black";
		surface.fillText(itemArray[arrowLocation].desc, 570, 560);
		surface.fillText(itemArray[arrowLocation].effectdesc, 570, 590);
	}
	
	var pointsArrayX = [240, 420, 600, 780, 960, 240, 420, 600, 780, 960];
	var pointsArrayY = [150, 150, 150, 150, 150, 280, 280, 280, 280, 280];
	
	for (var i = 0; i <= 9; i++)
	{
	surface.fillStyle = "#ffc7ff";
	surface.fillRect(pointsArrayX[i], pointsArrayY[i], 80, 80);
	surface.beginPath();
	surface.lineWidth = 3;
	surface.rect(pointsArrayX[i],pointsArrayY[i],80,80);
	surface.stroke();		
	}
	
	/*item0img.onload = function()
	{
		if (itemArray[0].qty != 0)
			surface.drawImage(item0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
	};*/
	item1img.onload = function()
	{
		if (itemArray[1].qty != 0)
			surface.drawImage(item1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
	};
	item2img.onload = function()
	{
		if (itemArray[2].qty != 0)
			surface.drawImage(item2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
	};
	item3img.onload = function()
	{
		if (itemArray[3].qty != 0)
			surface.drawImage(item3img, pointsArrayX[3]+8, pointsArrayY[3]+8);
	}
	item4img.onload = function()
	{
		if (itemArray[4].qty != 0)
			surface.drawImage(item4img, pointsArrayX[4]+8, pointsArrayY[4]+8);
	}
	item5img.onload = function()
	{
		if (itemArray[5].qty != 0)
		surface.drawImage(item5img, pointsArrayX[5]+8, pointsArrayY[5]+8);
	}
	if (itemArray[0].qty != 0)
		surface.drawImage(item0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
	if (itemArray[1].qty != 0)
			surface.drawImage(item1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
	if (itemArray[2].qty != 0)
		surface.drawImage(item2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
	if (itemArray[3].qty != 0)
		surface.drawImage(item3img, pointsArrayX[3]+8, pointsArrayY[3]+8);	
	if (itemArray[4].qty != 0)
		surface.drawImage(item4img, pointsArrayX[4]+8, pointsArrayY[4]+8);
	if (itemArray[5].qty != 0)
		surface.drawImage(item5img, pointsArrayX[5]+8, pointsArrayY[5]+8);
	
	arrow.onload = function()
	{
		surface.drawImage(arrow, pointsArrayX[arrowLocation]+24, pointsArrayY[arrowLocation]-16);
	}
	surface.drawImage(arrow, pointsArrayX[arrowLocation]+24, pointsArrayY[arrowLocation]-16);
	

	if (specialArrowLocation != 0)
	{
	specialArrow.onload = function()
	{
		surface.drawImage(specialArrow, 1240, 494);
	}
	if (specialArrowLocation == 1)
		surface.drawImage(specialArrow, 1240, 494);
	if (specialArrowLocation == 2)
		surface.drawImage(specialArrow, 1240, 574);
	}
}

function DrawGearScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.beginPath();
	surface.lineWidth = 3;
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();
	
	surface.fillRect(180, 400, 100, 100);
	surface.rect(180, 400, 100, 100); //icon
	surface.stroke();
	
	surface.fillRect(300, 400, 560, 160);
	surface.rect(300, 400, 560, 160); //description
	surface.stroke();
	
	surface.fillRect(880, 400, 300, 160); //stats
	surface.rect(880, 400, 300, 160);
	surface.stroke();
	
	surface.fillRect(40, 140, 260, 100);
	surface.rect(40, 140, 260, 100); //weapons vs armour buttons
	surface.fillRect(40, 260, 260, 100);
	surface.rect(40, 260, 260, 100);
	surface.stroke();
	
	var pointsArrayX = [360, 360, 360];
	var pointsArrayY = [120, 210, 300];
	
	for (var i = 0; i <= 2; i++)
	{
		surface.fillStyle = "white";
		surface.fillRect(pointsArrayX[i], pointsArrayY[i]+10, 480, 60);
		surface.rect(pointsArrayX[i], pointsArrayY[i]+10, 480, 60);
		surface.stroke();
		surface.fillStyle = "#ffc7ff";
		surface.fillRect(pointsArrayX[i], pointsArrayY[i], 80, 80);
		surface.beginPath();
		surface.lineWidth = 3;
		surface.rect(pointsArrayX[i],pointsArrayY[i],80,80);
		surface.stroke();
		surface.fillStyle = "black";
		
		surface.textAlign = "right";
		surface.font = "35px Arial Black";
		if (gearSelect == 0)
		{
			surface.fillText(armourArray[i].name, pointsArrayX[i] + 470, pointsArrayY[i] + 50);
		}
		else if (gearSelect == 1)
		{
			surface.fillText(weaponArray[i].name, pointsArrayX[i] + 470, pointsArrayY[i] + 50);
		}
	}
	
	surface.textAlign = "center";	
	surface.font = "50px Arial Black";
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);
	
	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.font = "50px Arial Black";
	surface.fillText("GEAR", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("INV.", 170, 75);
	surface.fillText("QUESTS", 1090, 75); //1110, 75
	surface.fillText("ARMOUR", 170, 200);
	surface.fillText("WEAPON", 170, 320);
	
	if (gearSelect == 0)
	{
		armour0img.onload = function()
		{
			surface.drawImage(armour0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
		}
		armour1img.onload = function()
		{
			surface.drawImage(armour1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
		}
		armour2img.onload = function()
		{
			surface.drawImage(armour2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
		}
		
		surface.drawImage(armour0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
		surface.drawImage(armour1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
		surface.drawImage(armour2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
		
		sideArrow.onload = function()
		{
			surface.drawImage(sideArrow, 10, 160, 50, 50);
		}
		surface.drawImage(sideArrow, 10, 160, 50, 50);
		
		surface.fillStyle = "green";
		surface.fillRect(pointsArrayX[equippedArmour]+490, pointsArrayY[equippedArmour]+20, 40, 40);
		surface.rect(pointsArrayX[equippedArmour]+490, pointsArrayY[equippedArmour]+20, 40, 40);
		surface.textAlign = "center";
		surface.fillStyle = "black";
		surface.font = "40px Arial Black";
		surface.fillText("E", pointsArrayX[equippedArmour]+510, pointsArrayY[equippedArmour]+55);
		surface.stroke();
	}
	else if (gearSelect == 1)
	{
		weapon0img.onload = function()
		{
			surface.drawImage(weapon0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
		}
		weapon1img.onload = function()
		{
			surface.drawImage(weapon1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
		}
		weapon2img.onload = function()
		{
			surface.drawImage(weapon2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
		}
		
		surface.drawImage(weapon0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
		surface.drawImage(weapon1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
		surface.drawImage(weapon2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
		
		surface.drawImage(sideArrow, 10, 280, 50, 50);
		
		surface.fillStyle = "green";
		surface.fillRect(pointsArrayX[equippedWeapon]+490, pointsArrayY[equippedWeapon]+20, 40, 40);
		surface.rect(pointsArrayX[equippedWeapon]+490, pointsArrayY[equippedWeapon]+20, 40, 40);
		surface.textAlign = "center";
		surface.fillStyle = "black";
		surface.font = "40px Arial Black";
		surface.fillText("E", pointsArrayX[equippedWeapon]+510, pointsArrayY[equippedWeapon]+55);
		surface.stroke();
	}
	
	surface.textAlign = "center";
	
	if (arrowLocation != 3)
	{
		surface.fillStyle = "white";
		surface.fillRect(900, 140, 300, 100);
		surface.rect(900, 140, 300, 100);
		surface.stroke();
		surface.font = "50px Arial Black";
		surface.fillStyle = "black";
		surface.fillText("EQUIP", 1050, 205);
		
		surface.drawImage(sideArrow, pointsArrayX[arrowLocation]-30, pointsArrayY[arrowLocation]+15, 50, 50);
		//880 400 300 160
		surface.font = "30px Arial Black";
		surface.textAlign = "left";
		surface.fillText("ATK", 900, 440);
		surface.fillText("DEF", 900, 490);
		surface.fillText("SPD", 900, 540);
		
		surface.textAlign = "center";
		surface.fillText(atk, 1030, 440);
		surface.fillText(def, 1030, 490);
		surface.fillText(spd, 1030, 540);
		if(gearSelect == 0)
		{
			if (arrowLocation == 0)
				surface.drawImage(armour0img, 180, 400, 100, 100);
			else if (arrowLocation == 1)
				surface.drawImage(armour1img, 180, 400, 100, 100);
			else if (arrowLocation == 2)
				surface.drawImage(armour2img, 180, 400, 100, 100);
			
			surface.fillText(armourArray[arrowLocation].name, 580, 450);
			
			surface.font = "20px Arial Black";
			surface.fillText(armourArray[arrowLocation].desc1, 580, 500);
			surface.fillText(armourArray[arrowLocation].desc2, 580, 520);
			
			surface.font = "30px Arial Black";
			surface.textAlign = "right";
			surface.fillStyle = "green";
			surface.fillText("+"+armourArray[arrowLocation].atkplus, 1160, 440);
			surface.fillText("+"+armourArray[arrowLocation].defplus, 1160, 490);
			if (armourArray[arrowLocation].spdplus >= 0)
				surface.fillText("+"+armourArray[arrowLocation].spdplus, 1160, 540);
			else
			{
				surface.fillStyle = "red";
				surface.fillText(armourArray[arrowLocation].spdplus, 1160, 540);
			}
		}
		else if (gearSelect == 1)
		{
			if (arrowLocation == 0)
				surface.drawImage(weapon0img, 180, 400, 100, 100);
			else if (arrowLocation == 1)
				surface.drawImage(weapon1img, 180, 400, 100, 100);
			else if (arrowLocation == 2)
				surface.drawImage(weapon2img, 180, 400, 100, 100);
			
			surface.fillText(weaponArray[arrowLocation].name, 580, 450);
			
			surface.font = "20px Arial Black";
			surface.fillText(weaponArray[arrowLocation].desc1, 580, 500);
			surface.fillText(weaponArray[arrowLocation].desc2, 580, 520);
			
			surface.font = "30px Arial Black";
			surface.textAlign = "right";
			surface.fillStyle = "green";
			surface.fillText("+"+weaponArray[arrowLocation].atkplus, 1160, 440);
			surface.fillText("+"+weaponArray[arrowLocation].defplus, 1160, 490);
			if (weaponArray[arrowLocation].spdplus >= 0)
				surface.fillText("+"+weaponArray[arrowLocation].spdplus, 1160, 540);
			else
			{
				surface.fillStyle = "red";
				surface.fillText(weaponArray[arrowLocation].spdplus, 1160, 540);
			}
		}
		
		if (specialArrowLocation == 1)
		{
			surface.drawImage(sideArrow, 870, 160, 50, 50);
		}
	}
}

function DrawMissionScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.beginPath();
	surface.lineWidth = 3;
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();
	
	surface.fillRect(600, 180, 540, 80); //selected mission title
	surface.rect(600, 180, 540, 80);
	
	surface.fillRect(600, 280, 540, 280);
	surface.rect(600, 280, 540, 280); //mission desc display
	surface.stroke();
	
	var pointsArrayX = [60, 60, 60, 60];
	var pointsArrayY = [180, 280, 380, 480];
	
	
	for (var i = 0; i < 4; i++)
	{
		surface.fillStyle = "white";
		surface.fillRect(pointsArrayX[i], pointsArrayY[i], 400, 80);
		surface.rect(pointsArrayX[i], pointsArrayY[i], 400, 80);
		surface.stroke();
		
		surface.fillStyle = "black";
		surface.font = "30px Arial Black";
		surface.fillText(missionArray[i].name, pointsArrayX[i]+200, pointsArrayY[i]+50);
		


		
		if (missionArray[i].crucial == true)
		{
			surface.drawImage(importantOrb, 460, pointsArrayY[i]+10, 60, 60);
			importantOrb.onload = function()
			{
				surface.drawImage(importantOrb, 460, 190, 60, 60);
			}
		}
		else
		{
			surface.drawImage(optionalOrb, 460, pointsArrayY[i]+10, 60, 60);
			optionalOrb.onload = function()
			{
				surface.drawImage(optionalOrb, 460, 290, 60, 60);
				surface.drawImage(optionalOrb, 460, 390, 60, 60);
				surface.drawImage(optionalOrb, 460, 490, 60, 60);
			}
		}	
	}
	
	surface.textAlign = "center";	
	surface.font = "50px Arial Black";
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);

	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.font = "50px Arial Black";
	surface.fillText("QUESTS", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("GEAR", 170, 75);
	surface.fillText("MAP", 1110, 75); //1110, 75
	
	surface.font = "30px Arial Black";
	surface.fillText(missionArray[arrowLocation].name, 870, 230);
	
	surface.font = "20px Arial Black";
	surface.fillText(missionArray[arrowLocation].desc1, 870, 400);
	surface.fillText(missionArray[arrowLocation].desc2, 870, 420);
	
	sideArrow.onload = function()
	{
		surface.drawImage(sideArrow, pointsArrayX[arrowLocation]-60, pointsArrayY[arrowLocation]+10, 60, 60);
	}
	surface.drawImage(sideArrow, pointsArrayX[arrowLocation]-60, pointsArrayY[arrowLocation]+10, 60, 60);
}

function DrawMapScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.beginPath();
	surface.lineWidth = 3;
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();
	
	map.onload = function()
	{
		surface.drawImage(map, 290, 160);	
		surface.drawImage(importantOrb, 630, 360);
		surface.drawImage(optionalOrb, 330, 420);
		surface.drawImage(optionalOrb, 760, 410);
		surface.drawImage(optionalOrb, 640, 400);
		surface.drawImage(playerArrow, 610, 370, 15, 20);
	}
	surface.drawImage(map, 290, 160);
	surface.rect(288, 158, 704, 404);
	surface.stroke();
	
	importantOrb.onload = function()
	{
		surface.drawImage(importantOrb, 630, 360);
	}
	surface.drawImage(importantOrb, 630, 360);
	
	optionalOrb.onload = function()
	{
		surface.drawImage(optionalOrb, 330, 420);
		surface.drawImage(optionalOrb, 760, 410);
		surface.drawImage(optionalOrb, 640, 400);
	}
	surface.drawImage(optionalOrb, 330, 420);
	surface.drawImage(optionalOrb, 760, 410);
	surface.drawImage(optionalOrb, 640, 400);
	
	playerArrow.onload = function()
	{
		surface.drawImage(playerArrow, 610, 370, 15, 20);
	}
	surface.drawImage(playerArrow, 610, 370, 15, 20);

	surface.textAlign = "center";	
	surface.font = "50px Arial Black";
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);

	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.font = "50px Arial Black";
	surface.fillText("MAP", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("QUESTS", 185, 75);
	surface.fillText("PAUSE", 1110, 75);
}

function DrawPauseScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.beginPath();
	surface.lineWidth = 3;
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();
	
	surface.fillRect (80, 200, 400, 120); //options
	surface.fillRect(80, 340, 400, 120);
	surface.fillRect(80, 480, 400, 120);
	surface.rect (80, 200, 400, 120);
	surface.rect (80, 340, 400, 120);
	surface.rect (80, 480, 400, 120);
	surface.stroke();
	
	surface.fillRect(560,200,640,100);
	surface.rect(560, 200, 640, 100); //status
	surface.fillRect(520, 320, 720, 300);
	surface.rect(520, 320, 720, 300);
	surface.stroke();
	
	surface.textAlign = "center";	
	surface.font = "50px Arial Black";
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);

	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.font = "50px Arial Black";
	surface.fillText("PAUSE", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("MAP", 175, 75);
	surface.fillText("INV.", 1110, 75);
	
	surface.font = "40px Arial Black";
	surface.fillText("RESUME", 280, 270);
	surface.fillText("SETTINGS", 280, 410);
	surface.fillText("QUIT", 280, 550);
	
	surface.fillText("STATUS", 880, 260);
	
	surface.font = "30px Arial Black";
	surface.textAlign = "left";
	surface.fillText("LV", 540, 360);
	surface.fillText("HP", 540, 400);
	surface.fillText("MP", 540, 440);
	surface.fillText("ATK", 540, 480);
	surface.fillText("DEF", 540, 520);
	surface.fillText("SPD", 540, 560);
	surface.fillText("GOLD", 540, 600);
	
	surface.textAlign = "right";
	surface.fillText(lv, 1220, 360);
	surface.fillText(currentHP + "/" + maxHP, 1220, 400);
	surface.fillText(currentMP + "/" + maxMP, 1220, 440);
	surface.fillText(atk + " -> " + (atk + weaponArray[equippedWeapon].atkplus), 1220, 480);
	surface.fillText(def + " -> " + (def + armourArray[equippedArmour].defplus), 1220, 520);
	surface.fillText(spd + " -> " + (spd + weaponArray[equippedWeapon].spdplus + armourArray[equippedArmour].spdplus), 1220, 560);
	surface.fillText(gold, 1220, 600);
	
	var pointsArrayX = [80, 80, 80];
	var pointsArrayY = [200, 340, 480];
	
	sideArrow.onload = function()
	{
		surface.drawImage(sideArrow, pointsArrayX[arrowLocation]-50, pointsArrayY[arrowLocation]+20, 80, 80);
	}
	surface.drawImage(sideArrow, pointsArrayX[arrowLocation]-50, pointsArrayY[arrowLocation]+20, 80, 80);
}

function DrawShopScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.beginPath();
	surface.lineWidth = 3;
	surface.fillRect(320, 10, 640, 100); //title
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
//	surface.fillRect(140,130,120,120); //item icon
//	surface.rect(140, 130, 120, 120);
//	surface.stroke();
	
	surface.fillRect(220,400,640,100); //item name
	surface.rect(220, 400, 640, 100);
	surface.stroke();
	
	surface.fillRect(80, 400, 100, 100);
	surface.rect(80, 400, 100, 100); //icon
	surface.stroke();
	
	surface.fillRect(80, 520, 780, 100);
	surface.rect(80, 520, 780, 100); //description
	surface.stroke();
	
	surface.fillRect(900, 400, 300, 60);
	surface.rect(900, 400, 300, 60); //# held
	surface.stroke();
	
	surface.fillRect(900,560,60,60);
	surface.rect(900, 560, 60, 60); //quantity to buy
	surface.stroke();
	
	surface.fillRect(900,480,140,60);
	surface.rect(900, 480, 140, 60);//GOLD
	surface.fillRect(1060,480,140,60);
	surface.rect(1060, 480, 140, 60);//COST
	surface.stroke();

	surface.fillRect(1000, 560, 200, 60);
	surface.rect(1000, 560, 200, 60); //BUY button
	surface.stroke();
	
	var pointsArrayX = [80, 80, 80, 700, 700, 700];
	var pointsArrayY = [130, 210, 290, 130, 210, 290];
	
	for (var i = 0; i < 6; i++)
	{
		surface.fillStyle = "white";
		surface.fillRect(pointsArrayX[i], pointsArrayY[i], 500, 70);
		surface.rect(pointsArrayX[i], pointsArrayY[i], 500, 70);
		surface.stroke();
		
		surface.beginPath();
		surface.fillRect(pointsArrayX[i]-40, pointsArrayY[i]+5, 60, 60);
		surface.rect(pointsArrayX[i]-40, pointsArrayY[i]+5, 60, 60);
		surface.stroke();
		
		surface.fillStyle = "black";
		surface.font = "30px Arial Black";
		surface.textAlign = "right";
		surface.fillText(itemArray[i].name, pointsArrayX[i]+490, pointsArrayY[i]+45);
		surface.textAlign = "center";
		surface.font = "25px Arial Black";
		surface.fillText(itemArray[i].price, pointsArrayX[i]-10, pointsArrayY[i]+42);
	}
	
	surface.fillStyle = "black";
	surface.font = "50px Arial Black";
	surface.fillText("SHOP", 640, 75);
	
	surface.font = "25px Arial Black";
	surface.fillText("GOLD", 970, 505);
	surface.fillText(gold, 970, 530);
	surface.fillText("COST", 1130, 505);
	surface.fillText(itemArray[arrowLocation].price * qtyToBuy, 1130, 530);
	
	surface.font = "40px Arial Black";
	surface.fillText(itemArray[arrowLocation].name, 540, 460);
	surface.font = "30px Arial Black";
	surface.fillText("HELD: "+itemArray[arrowLocation].qty,1050, 440);
	surface.font = "20px Arial Black";
	surface.fillText(itemArray[arrowLocation].desc, 490, 560);
	surface.fillText(itemArray[arrowLocation].effectdesc, 490, 590);
	
	specialArrow.onload = function()
	{
		surface.drawImage(specialArrow, pointsArrayX[arrowLocation]+500, pointsArrayY[arrowLocation], 70, 70);
	};
	surface.drawImage(specialArrow, pointsArrayX[arrowLocation]+500, pointsArrayY[arrowLocation], 70, 70);
	
	if (specialArrowLocation == 1)
	{
		surface.drawImage(specialArrow, 1200, 560, 60, 60);
		surface.fillStyle = "black";
		surface.font = "35px Arial Black";
		surface.fillText("BUY?", 1100, 600);
		surface.fillText(qtyToBuy, 930, 600);
		//surface.font = "15px Arial Black";
		surface.fillText("+", 975, 600);
		surface.fillText("-", 888, 598);
	}
	
	item0img.onload = function()
	{
		if (arrowLocation == 0)
		{
			surface.drawImage(item0img, 80, 400, 100, 100);
		}
	};
	if (arrowLocation == 0)
	{
		surface.drawImage(item0img, 80, 400, 100, 100);
	}
	
	if (arrowLocation == 1)
	{
		item1img.onload = function()
		{
			surface.drawImage(item1img, 80, 400, 100, 100);
		};
		surface.drawImage(item1img, 80, 400, 100, 100);
	}
	
	if (arrowLocation == 2)
	{
		item2img.onload = function()
		{
			surface.drawImage(item2img, 80, 400, 100, 100);
		};
		surface.drawImage(item2img, 80, 400, 100, 100);
	}
	
	if (arrowLocation == 3)
	{
		item3img.onload = function()
		{
			surface.drawImage(item3img, 80, 400, 100, 100);
		};
		surface.drawImage(item3img, 80, 400, 100, 100);
	}
	
	if (arrowLocation == 4)
	{
		item4img.onload = function()
		{
			surface.drawImage(item4img, 80, 400, 100, 100);
		};
		surface.drawImage(item4img, 80, 400, 100, 100);
	}
	
	if (arrowLocation == 5)
	{
		item5img.onload = function()
		{
			surface.drawImage(item5img, 80, 400, 100, 100);
		};
		surface.drawImage(item5img, 80, 400, 100, 100);
	}
	
}

function DrawHudScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.fillStyle = "black";
	surface.textAlign = "center";
	surface.font = "40px Arial Black";
	surface.fillText("HUD SCREEN STAND-IN", 640, 100);
	surface.fillText("SHORTCUTS:", 640, 150);
	surface.fillText("0 - HUD", 640, 200);
	surface.fillText("1 - PAUSE MENU", 640, 250);
	surface.fillText("2 - SHOP SCREEN", 640, 300);
	surface.fillText("3 - GAME OVER", 640, 350);
	surface.fillText("4 - CREDITS", 640, 400);
}

function keyDown()
{
	switch (event.keyCode)
	{

		case 87: //W
			if (currentScreen == 0)
			{
				if (arrowLocation > 0)
					arrowLocation--;
				else
					arrowLocation = 2;
				fip.play();
				DrawPauseScreen();
			}
			else if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation >= 5)
					{
						arrowLocation -= 5;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 2;
					fip.play();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation==2)
				{
					specialArrowLocation = 1;
					fip.play();
					DrawInventoryScreen();
				}
			}
			else if (currentScreen == 2)
			{
				if (arrowLocation == 3)
				{
					if (gearSelect == 0)
						gearSelect = 1;
					else if (gearSelect == 1)
						gearSelect = 0;
					fip.play();
					DrawGearScreen();
				}
				else if (arrowLocation != 3 && specialArrowLocation == 0)
				{
					if (arrowLocation > 0)
						arrowLocation--;
					else
						arrowLocation = 2;
					fip.play();
					DrawGearScreen();
				}
				else if (specialArrowLocation == 1)
					bimp.play();
			}
			else if (currentScreen == 3)
			{
				if (arrowLocation > 0)
				{
					arrowLocation--;
					fip.play();
					DrawMissionScreen();
				}
				else
				{
					arrowLocation = 3;
					fip.play();
					DrawMissionScreen();
				}
			}
			else if (currentScreen == 5)
			{
				if (arrowLocation!=0 && arrowLocation!=3 && specialArrowLocation == 0)
				{
					arrowLocation--;
					fip.play();
					DrawShopScreen();
				}
				else
					bimp.play();
			}
			break;
		case 83: //S
			if (currentScreen == 0)
			{
				if (arrowLocation < 2)
					arrowLocation++;
				else
					arrowLocation = 0;
				fip.play();
				DrawPauseScreen();
			}
			else if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation <= 4)
					{
						arrowLocation += 5;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 2;
					fip.play();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation==2)
				{
					specialArrowLocation = 1;
					fip.play();
					DrawInventoryScreen();
				}
			}
			else if (currentScreen == 2)
			{
				if (arrowLocation == 3)
				{
					if (gearSelect == 0)
						gearSelect = 1;
					else if (gearSelect == 1)
						gearSelect = 0;
					fip.play();
					DrawGearScreen();
				}
				else if (arrowLocation != 3 && specialArrowLocation == 0)
				{
					if (arrowLocation < 2)
						arrowLocation++;
					else
						arrowLocation = 0;
					fip.play();
					DrawGearScreen();
				}
				else if (specialArrowLocation == 1)
					bimp.play();
			}
			else if (currentScreen == 3)
			{
				if (arrowLocation < 3)
				{
					arrowLocation++;
					fip.play();
					DrawMissionScreen();
				}
				else
				{
					arrowLocation = 0;
					fip.play();
					DrawMissionScreen();
				}
			}
			else if (currentScreen == 5)
			{
				if (arrowLocation != 2 && arrowLocation != 5 && specialArrowLocation == 0)
				{
					arrowLocation++;
					fip.play();
					DrawShopScreen();
				}
				else
					bimp.play();
			}
			break;
		case 65: //A
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
				if (arrowLocation > 0)
					{
						arrowLocation -= 1;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
			}
			else if (currentScreen == 5)
			{
				if (specialArrowLocation == 0 && arrowLocation > 2)
				{
					arrowLocation -= 3;
					fip.play();
					DrawShopScreen();
				}
				else if (specialArrowLocation == 0)
					bimp.play();
				else if (specialArrowLocation == 1)
				{
					if (qtyToBuy > 1)
					{
						qtyToBuy--;
						fip.play();
						DrawShopScreen();
					}
					else
						bimp.play();
				}
			}
			break;
		case 68: //D
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation < 9)
					{
						arrowLocation += 1;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
			}
			else if (currentScreen == 5)
			{
				if (specialArrowLocation == 0 && arrowLocation < 3)
				{
					arrowLocation += 3;
					fip.play();
					DrawShopScreen();
				}
				else if (specialArrowLocation == 0)
					bimp.play();
				else if (specialArrowLocation == 1)
				{
					if (itemArray[arrowLocation].price * (qtyToBuy+1) <= gold)
					{
						qtyToBuy+=1;
						fip.play();
						DrawShopScreen();
					}
					else
						bimp.play();
				}
			}
			break;
		case 32: //Space
			if (currentScreen == 0)
			{
				if (arrowLocation == 0)
				{
					ding.play();
					resumeGame();
				}
				else if (arrowLocation == 1)
				{
					ding.play();
				}
				else if (arrowLocation == 2)
				{
					ding.play();
					quitGame();
				}
			}
			else if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation <=5)
					{
						if (itemArray[arrowLocation].qty > 0)
						{
							specialArrowLocation = 1;
							ding.play();
							DrawInventoryScreen();
						}
						else
							bimp.play();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 0;
					UseItem();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation == 2)
				{
					specialArrowLocation = 0;
					DiscardItem();
					ding.play();
					DrawInventoryScreen();
				}
			}
			else if (currentScreen == 2)
			{
				if (arrowLocation == 3)
				{
					arrowLocation = 0;
					ding.play();
					DrawGearScreen();
				}
				else if (arrowLocation != 3 && specialArrowLocation == 0)
				{
					specialArrowLocation = 1;
					ding.play();
					DrawGearScreen();
				}
				else if (specialArrowLocation == 1)
				{
					if (gearSelect == 0)
						equippedArmour = arrowLocation;
					else if (gearSelect == 1)
						equippedWeapon = arrowLocation;
					ding.play();
					specialArrowLocation = 0;
					arrowLocation = 3;
					DrawGearScreen();
				}
			}
			else if (currentScreen == 5)
			{
				if (specialArrowLocation == 0)
				{
					if (itemArray[arrowLocation].price <= gold)
					{
						specialArrowLocation = 1;
						ding.play();
						DrawShopScreen();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					BuyItem();
					ding.play();
					qtyToBuy = 0;
					specialArrowLocation = 0;
					DrawShopScreen();
				}
			}
			break;
		case 8: //Backspace
			if (currentScreen == 1)
			{
				if (specialArrowLocation != 0)
				{
					specialArrowLocation = 0;
					shoo.play();
					DrawInventoryScreen();
				}
			}
			else if (currentScreen == 2)
			{
				if (arrowLocation != 3 && specialArrowLocation == 0)
				{
					arrowLocation = 3;
					shoo.play();
					DrawGearScreen();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 0;
					shoo.play();
					DrawGearScreen();
				}
			}
			else if (currentScreen == 5)
			{
				if (specialArrowLocation == 1)
				{
					specialArrowLocation = 0;
					qtyToBuy = 1;
					shoo.play();
					DrawShopScreen();
				}
			}
			else if (currentScreen == 0)
			{
				shoo.play();
				StartHudScreen();
			}
			break;
			case 81: //Q
			if (currentScreen == 0)
			{
				ding.play();
				StartMapScreen();
			}
			else if (currentScreen == 1)
			{
				ding.play();
				StartPauseScreen();
			}
			else if (currentScreen == 2)
			{
				ding.play();
				StartInventoryScreen();
			}
			else if (currentScreen == 3)
			{
				ding.play();
				StartGearScreen();
			}
			else if (currentScreen == 4)
			{
				ding.play();
				StartMissionScreen();
			}
			break;
			case 80: //P
			if (currentScreen == 0)
			{
				ding.play();
				StartInventoryScreen();
			}
			else if (currentScreen == 1)
			{
				ding.play();
				StartGearScreen();
			}
			else if (currentScreen == 2)
			{
				ding.play();
				StartMissionScreen();
			}
			else if (currentScreen == 3)
			{
				ding.play();
				StartMapScreen();
			}
			else if (currentScreen == 4)
			{
				ding.play();
				StartPauseScreen();
			}
			else if (currentScreen == 6)
			{
				ding.play();
				StartPauseScreen();
			}
			break;
			case 48: //0
			StartHudScreen();
			break;
			case 49: //1
			StartPauseScreen();
			break;
			case 50: //2
			StartShopScreen();
			break;
			case 51: //3
			window.location.href = "UIGameOver.html";
			break;
			case 52: //4
			window.location.href = "UICredits.html";
			break;
	} 
}

function UseItem()
{
	if (arrowLocation == 0)
	{
		if (currentHP + 400 <= maxHP)
			currentHP += 400;
		else
			currentHP = maxHP;
		itemArray[0].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 1)
	{
		if (currentMP + 50 <= maxMP)
			currentMP += 50;
		else
			currentMP = maxMP;
		itemArray[1].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 2)
	{
		atk += 2;
		itemArray[2].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 3)
	{
		def += 2;
		itemArray[3].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 4)
	{
		bimp.play();
	}
	if (arrowLocation == 5)
	{
		if (currentHP + 500 <= maxHP)
			currentHP += 500;
		else
			currentHP = maxHP;
		
		if (currentMP + 100 <= maxMP)
			currentMP += 100;
		else
			currentMP = maxMP;
		itemArray[5].qty -= 1;
		whirr.play();
	}
}

function DiscardItem()
{
	itemArray[arrowLocation].qty -= 1;
}

function BuyItem()
{
	itemArray[arrowLocation].qty += qtyToBuy;
	gold -= (itemArray[arrowLocation].price * qtyToBuy);
}

function resumeGame()
{
	StartHudScreen();
}

function quitGame()
{
	window.location.href = "MainMenu.html";
}