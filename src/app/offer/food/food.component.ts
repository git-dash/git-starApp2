import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { ConfirmModalComponent } from '../../shared/shared-material/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  food: any;
  foodItems: any[];

  purchasedEvents: number[] = this.dbService.getStoreData('purchasedEvents') || [];
  eventList: { 'id': number, 'imageURL': string; 'desc': string; 'cost': number }[];
  selectRegion = [];
  constructor(private dbService: DbFirebaseService, private dialog: MatDialog) { }

  foodOptions = [
    { 'select': 'north', color: 'default', title: 'North' },
    { 'select': 'south', color: 'warn', title: 'South' },
    { 'select': 'west', color: 'primary', title: 'West' },
    { 'select': 'east', color: 'accent', title: 'East' },
  ];
  ngOnInit() {

    this.eventList = environment.eventList.map(x => {
      return {
        id: x.id,
        imageURL: x.imageURL,
        desc: x.desc,
        cost: Math.floor(Math.random() * 500),

      };
    });

    this.foodItems = [
      { image: '' }
    ];
    this.food =
      {
        "north": [
          {
            "id": 1,
            "name": "Aloo gobi",
            "image": "Aloo_gobi.jpg",
            "cost": 278,
            "type": "Vegetarian",
            "description": "Cauliflower with potatoes sautéed with garam masala, turmeric, sometimes kalonji and curry leaves."
          }, {
            "id": 2,
            "name": "Baati",
            "image": "Baati.jpg",
            "cost": 232,
            "type": "Vegetarian",
            "description": "Ghee (clarified butter), wheat flour"
          }, {
            "id": 3,
            "name": "Bhatura",
            "image": "Bhatura.jpg",
            "cost": 148,
            "type": "Vegetarian",
            "description": "Bread. All-purpose flour"
          }, {
            "id": 4,
            "name": "Biryani",
            "image": "India_food.jpg",
            "cost": 167,
            "type": "",
            "description": "Main or side dish. Mixed rice dish, optional spices, optional vegetables, meats or seafood. Can be served with plain yogurt."
          }, {
            "id": 5,
            "name": "Butter chicken",
            "image": "Chicken_makhani.jpg",
            "cost": 437,
            "type": "Non-Vegetarian",
            "description": "Also known as murgh mahal"
          }, {
            "id": 6,
            "name": "Chaat",
            "image": "Delhi_Chaat_with_saunth_chutney.jpg",
            "cost": 411,
            "type": "Vegetarian",
            "description": "Street food usually containing a potato patty fried in oil, topped with sweet yogurt, and other sauces, spices"
          }, {
            "id": 7,
            "name": "Chana masala",
            "image": "Choleindia.jpg",
            "cost": 218,
            "type": "Vegetarian",
            "description": "Chickpeas of the Chana type in tomato based sauce."
          }, {
            "id": 8,
            "name": "Chapati",
            "image": "Chapatiroll.jpg",
            "cost": 411,
            "type": "Vegetarian",
            "description": "Bread. Whole wheat flour"
          }, {
            "id": 9,
            "name": "Chicken Tikka",
            "image": "Chicken_tikka_by_fatima.jpg",
            "cost": 269,
            "type": "",
            "description": "Chicken with spices served on a skewer"
          }, {
            "id": 10,
            "name": "Chicken Tikka masala",
            "image": "Chicken_tikka_masala.jpg",
            "cost": 301,
            "type": "",
            "description": "Chicken marinated in a Yogurt tomato sauce. Creamy texture."
          }, {
            "id": 11,
            "name": "Chole bhature",
            "image": "Chana_masala.jpg",
            "cost": 194,
            "type": "Vegetarian",
            "description": "Main course. Chick peas, assorted spices, wheat flour and yeast for bhatura."
          }, {
            "id": 12,
            "name": "Dal makhani (kali dal)",
            "image": "Dal_Makhani.jpg",
            "cost": 427,
            "type": "Vegetarian",
            "description": "Main course. A typical type of lentil is used."
          }, {
            "id": 13,
            "name": "Dal",
            "image": "Dal_Makhani.jpg",
            "cost": 199,
            "type": "Vegetarian",
            "description": "Assorted types of lentils, such as toor, urad, chana, masoor dal"
          }, {
            "id": 14,
            "name": "Dum aloo",
            "image": "Kashmiri_Dum_Aaloo.JPG",
            "cost": 186,
            "type": "Vegetarian",
            "description": "Potatoes cooked in curry"
          }, {
            "id": 15,
            "name": "Poha",
            "image": "Poha,_a_snack_made_of_flattened_rice.jpg",
            "cost": 136,
            "type": "Vegetarian",
            "description": "Specialty from Madhya Pradesh. Common snack in central part of India. Flattended rice, potato, turmeric."
          }, {
            "id": 16,
            "name": "Gajar ka halwa",
            "image": "Gajjar_ka_halwa_(carrot_halwa).JPG",
            "cost": 313,
            "type": "Vegetarian",
            "description": "A sweet dish native to U.P. / Punjab. Carrot, Milk, Ghee, Cashew."
          }, {
            "id": 17,
            "name": "Imarti",
            "image": "JalebiIndia.jpg",
            "cost": 321,
            "type": "Vegetarian",
            "description": "A spherically meshed sweet dish from North India made up of batter from moong dal dipped in sugary syrup"
          }, {
            "id": 18,
            "name": "Jalebi",
            "image": "Awadhi_jalebi.jpg",
            "cost": 340,
            "type": "Vegetarian",
            "description": "A North Indian twisted noodle like sweet dish dipped in sugary syrup"
          }, {
            "id": 19,
            "name": "Kachori",
            "image": "Cachuri2_flipped.jpg",
            "cost": 475,
            "type": "Vegetarian",
            "description": "Rajasthani / Marwari special"
          }, {
            "id": 20,
            "name": "Kheer",
            "image": "Kheer.jpg",
            "cost": 335,
            "type": "Vegetarian",
            "description": "Rice cooked with milk and dry fruits"
          }, {
            "id": 21,
            "name": "Khichdi",
            "image": "Khichuri_edit.jpg",
            "cost": 164,
            "type": "Vegetarian",
            "description": "Rice cooked with daal and veggies and sauteed"
          }, {
            "id": 22,
            "name": "Kofta",
            "image": "Paneer_Kofta_Curry.JPG",
            "cost": 418,
            "type": "Vegetarian",
            "description": "Gram flour balls fried with vegetables. Gram flour, veggies, rolled into balls with gram flour and fried in oil and then cooked with curry."
          }, {
            "id": 23,
            "name": "Kulfi falooda",
            "image": "Matkakulfi.jpg",
            "cost": 142,
            "type": "Vegetarian",
            "description": "A dessert"
          }, {
            "id": 24,
            "name": "Litti chokha",
            "image": "Litti_chokha.jpg",
            "cost": 431,
            "type": "Vegetarian",
            "description": "A baked salted wheat flour cake filled with sattu (baked chickpea flour) and some special spices"
          }, {
            "id": 25,
            "name": "Makki di roti, sarson da saag",
            "image": "Saagroti.jpg",
            "cost": 276,
            "type": "Vegetarian",
            "description": "Punjabi speciality"
          }, {
            "id": 26,
            "name": "Naan",
            "image": "Annapurna_Naan.jpg",
            "cost": 287,
            "type": "Vegetarian",
            "description": "Tandoor-baked soft flatbread. Refined wheat flour."
          }, {
            "id": 27,
            "name": "Pakhala",
            "image": "Pakhala.jpg",
            "cost": 173,
            "type": "Vegetarian",
            "description": "Cooked rice with water"
          }, {
            "id": 28,
            "name": "Palak paneer",
            "image": "Palakpaneer.jpg",
            "cost": 175,
            "type": "Vegetarian",
            "description": "Paneer cubes in spinach gravy"
          }, {
            "id": 29,
            "name": "Pani puri",
            "image": "Indian_cuisine_Panipuri_03.jpg",
            "cost": 389,
            "type": "Vegetarian",
            "description": "Typical north Indian tadka"
          }, {
            "id": 30,
            "name": "Paratha",
            "image": "Mintparatha.jpg",
            "cost": 170,
            "type": "Vegetarian",
            "description": "Bread. Wheat flour. Can be stuffed. Common stuffings: potato mixture, paneer, muli(white radish)."
          }, {
            "id": 31,
            "name": "Rajma",
            "image": "Rajma,_kidney_beans,_served_with_chawal,_rice.jpg",
            "cost": 149,
            "type": "Vegetarian",
            "description": "Main. Kidney beans & assorted spices."
          }, {
            "id": 32,
            "name": "Samosa",
            "image": "Samosachutney.jpg",
            "cost": 386,
            "type": "Vegetarian/meat varieties",
            "description": "Normally served as an entree or appetiser. Potatoes, onions, peas, coriander, and lentils, may be served with a mint or tamarind sauce"
          }, {
            "id": 33,
            "name": "Shahi paneer",
            "image": "Shahi_paneer_and_palak_paneer.JPG",
            "cost": 434,
            "type": "Vegetarian",
            "description": "A popular Indian, as well as Punjabi and Nepalese dish, made with paneer in a thick cream and tomato gravy and spices"
          }, {
            "id": 34,
            "name": "Tandoori Chicken",
            "image": "A_piece_of_a_tandoori_chicken.JPG",
            "cost": 475,
            "type": "Non-Vegetarian",
            "description": "Tandoori chicken as a dish originated in the Punjab before the independence of India and Pakistan."
          }],
        "west": [
          {
            "id": 1,
            "name": "Barfi",
            "image": "Barfi_Diwali_sweet.jpg",
            "cost": 283,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 2,
            "name": "Bhakri",
            "image": "Another_Vegetarian_Meal.jpg",
            "cost": 458,
            "type": "",
            "description": "Bread. Whole wheat flour, thicker than rotli, crispy."
          }, {
            "id": 3,
            "name": "Bombil fry",
            "image": "Bombil.jpg",
            "cost": 262,
            "type": "",
            "description": "Main Course. Bombay Duck (Fish)."
          }, {
            "id": 4,
            "name": "Chaat",
            "image": "Bhalla_Papri_Chaat_with_saunth_chutney.jpg",
            "cost": 469,
            "type": "Vegetarian",
            "description": "Snack"
          }, {
            "id": 5,
            "name": "Chakri (chakali)",
            "image": "Chakali.JPG",
            "cost": 479,
            "type": "Vegetarian",
            "description": "Savoury snack. Mixed grain flour."
          }, {
            "id": 6,
            "name": "Chevdo",
            "image": "Bombaymix.jpg",
            "cost": 196,
            "type": "",
            "description": "Mixture. Flattened rice, groundnut, chana, masala."
          }, {
            "id": 7,
            "name": "Dahi vada",
            "image": "Dahi_Vadas_(Dhai_Bhalla).JPG",
            "cost": 239,
            "type": "Vegetarian",
            "description": "Fried lentil balls in a yogurt sauce. Lentils, yogurt."
          }, {
            "id": 8,
            "name": "Dhokla",
            "image": "Khaman_dhokla.jpg",
            "cost": 271,
            "type": "Vegetarian",
            "description": "Lentil snack. Gram."
          }, {
            "id": 9,
            "name": "Dum aaloo",
            "image": "Kashmiri_Dum_Aaloo.JPG",
            "cost": 377,
            "type": "Vegetarian",
            "description": "Veg. Main dish. Potatoes deep fry, yogurt, coriander powder, ginger powder."
          }, {
            "id": 10,
            "name": "Pohe",
            "image": "Poha,_a_snack_made_of_flattened_rice.jpg",
            "cost": 374,
            "type": "Vegetarian",
            "description": "Snack. Flattened rice"
          }, {
            "id": 11,
            "name": "Gajar halwo",
            "image": "Gajjar_ka_halwa_(carrot_halwa).JPG",
            "cost": 464,
            "type": "",
            "description": "Sweet. Carrot Halwa"
          }, {
            "id": 12,
            "name": "Gulab jamun",
            "image": "Gulab_Jamun.jpg",
            "cost": 346,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 13,
            "name": "Jalebi",
            "image": "Jalebi_(sweet).jpg",
            "cost": 433,
            "type": "Sweet",
            "description": "Sweet maida & grained semolina flour, baking powder, curd, sugar."
          }, {
            "id": 14,
            "name": "Jeera Aloo",
            "image": "Jeera_aloo_served_with_sprouts_and_dal.jpg",
            "cost": 123,
            "type": "Vegetarian",
            "description": "Typical West Indian dish"
          }, {
            "id": 15,
            "name": "Khakhra",
            "image": "Gujarati_khakhra.jpg",
            "cost": 136,
            "type": "",
            "description": "Snack. Wheat flour, methi."
          }, {
            "id": 16,
            "name": "Khandvi",
            "image": "Khandvi,_Gujarati_snack.jpg",
            "cost": 184,
            "type": "",
            "description": "Snack. Besan."
          }, {
            "id": 17,
            "name": "Kombdi vade",
            "image": "Komdi_vade.jpg",
            "cost": 162,
            "type": "",
            "description": "Chicken Curry with Bread. Chicken."
          }, {
            "id": 18,
            "name": "Laddu",
            "image": "Laddu1.JPG",
            "cost": 398,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 19,
            "name": "Malpua",
            "image": "Malapua_Odia_cuisine.jpg",
            "cost": 484,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 20,
            "name": "Modak",
            "image": "MMutta_Savouries1.JPG",
            "cost": 171,
            "type": "",
            "description": "Sweet coconut dumplings. Rice flour, coconut."
          }, {
            "id": 21,
            "name": "Panipuri",
            "image": "Indian_cuisine_Panipuri_03.jpg",
            "cost": 297,
            "type": "",
            "description": "Snack"
          }, {
            "id": 22,
            "name": "Pav Bhaji",
            "image": "Pav_Bhaji.jpg",
            "cost": 177,
            "type": "",
            "description": "Veg main dish. Mix curry of onion, capsicum, peas, cauliflower potatoes."
          }, {
            "id": 23,
            "name": "Pooran-poli",
            "image": "Coconut_holige.jpg",
            "cost": 144,
            "type": "",
            "description": "Sweet stuffed bread. Wheat flour, gram."
          }, {
            "id": 24,
            "name": "Puri",
            "image": "Puri.jpg",
            "cost": 218,
            "type": "",
            "description": "Bread. Wheat flour."
          }, {
            "id": 25,
            "name": "Puri Bhaji",
            "image": "Puri_Bhaji.JPG",
            "cost": 443,
            "type": "",
            "description": "Breakfast or Snack"
          }, {
            "id": 26,
            "name": "Shankarpali",
            "image": "Shankarpali_sweets_mithai_Western_India_2012.jpg",
            "cost": 364,
            "type": "",
            "description": "Sweet or savoury snack. Plain flour, sugar."
          }, {
            "id": 27,
            "name": "Shiro",
            "image": "Taita_and_shiro.jpg",
            "cost": 152,
            "type": "",
            "description": "Sweet roasted semolina/flour/dal with milk, butter, sugar, nuts and raisins."
          }, {
            "id": 28,
            "name": "Shrikhand",
            "image": "Shrikhand_london_kastoori.jpg",
            "cost": 183,
            "type": "",
            "description": "Sweet A thick yogurt-based sweet dessert garnished with ground nuts, cardamom, and saffron."
          }, {
            "id": 29,
            "name": "Sohan papdi",
            "image": "Soanpapdi.JPG",
            "cost": 320,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 30,
            "name": "Sukhdi",
            "image": "Sukhdi.jpg",
            "cost": 459,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 31,
            "name": "Upmaa",
            "image": "Upma.jpg",
            "cost": 116,
            "type": "",
            "description": "Vegetarian snack. Semolina."
          }, {
            "id": 32,
            "name": "Vada pav",
            "image": "Jumbo_Vada_Pav_(dodged).jpg",
            "cost": 358,
            "type": "",
            "description": "Burger. Gram flour, potatoes, chilli, garlic, ginger."
          }, {
            "id": 33,
            "name": "Vindaloo",
            "image": "Vindalho.jpg",
            "cost": 169,
            "type": "",
            "description": "Goan pork vindaloo. Pork, goan red chilli paste."
          }, {
            "id": 34,
            "name": "Ghebar or Ghevar",
            "image": "GhevarRajasthaniSweet.jpg",
            "cost": 358,
            "type": "",
            "description": "Sweet from Surat"
          }, {
            "id": 35,
            "name": "Lilva Kachori",
            "image": "Cachuri2_flipped.jpg",
            "cost": 321,
            "type": "",
            "description": "Snack. Lilva and whole wheat flour."
          }, {
            "id": 36,
            "name": "Maghaz",
            "image": "Magaj.jpg",
            "cost": 495,
            "type": "",
            "description": ""
          }],
        "south": [
          {
            "id": 1,
            "name": "Avial",
            "image": "Sambar&Avial.jpg",
            "cost": 181,
            "type": "Vegetarian",
            "description": "Coconut paste, curd mixed with vegetables and some spices."
          }, {
            "id": 2,
            "name": "Bajji",
            "image": "Chilli_Bites_(Bhaji).jpg",
            "cost": 392,
            "type": "Vegetarian",
            "description": "Vegetable or onion fritters"
          }, {
            "id": 3,
            "name": "Biryani",
            "image": "India_food.jpg",
            "cost": 395,
            "type": "Depends on choice",
            "description": "Spicy rice dish with vegetables or chicken or mutton or fish or prawns."
          }, {
            "id": 4,
            "name": "Bisi bele bath",
            "image": "Bisi_Bele_Bath.jpg",
            "cost": 179,
            "type": "Vegetarian",
            "description": "Rice preparation with vegetables."
          }, {
            "id": 5,
            "name": "Bonda",
            "image": "Bonda2.jpg",
            "cost": 115,
            "type": "Vegetarian",
            "description": "Snack. Potatoes, gram flour."
          }, {
            "id": 6,
            "name": "Chicken 65",
            "image": "Chicken_65.jpg",
            "cost": 445,
            "type": "Non-Vegetarian",
            "description": "Popular deep fried chicken preparation. Chicken, onion, ginger"
          }, {
            "id": 7,
            "name": "Dosa",
            "image": "Dosa_chutney_sambhar.jpg",
            "cost": 399,
            "type": "Vegetarian",
            "description": "Pancake/Hopper. Ground rice, urad dal"
          }, {
            "id": 8,
            "name": "Double ka meetha",
            "image": "DoubleKaMeetha.JPG",
            "cost": 377,
            "type": "Sweet",
            "description": "Bread crumbs fried in Ghee and dipped in milk and sugar syrup"
          }, {
            "id": 9,
            "name": "Idiappam",
            "image": "Idiyappam.jpg",
            "cost": 275,
            "type": "Vegetarian",
            "description": "Steamed rice noodles / vermicelli. Ground rice"
          }, {
            "id": 10,
            "name": "Idli",
            "image": "Idli_Sambar.JPG",
            "cost": 286,
            "type": "Vegetarian",
            "description": "Steamed cake of fermented rice and pulse flour. Rice, urad dal"
          }, {
            "id": 11,
            "name": "Indian omelette",
            "image": "Indian_Omelette.jpg",
            "cost": 396,
            "type": "",
            "description": "Egg omelette or veg omelette"
          }, {
            "id": 12,
            "name": "Koottu",
            "image": "Cabbage_kootu.jpg",
            "cost": 289,
            "type": "Vegetarian",
            "description": "Vegetable, daal or lentil mixture boiled in water"
          }, {
            "id": 13,
            "name": "Kuzhakkattai",
            "image": "Kozhukkatta.jpg",
            "cost": 453,
            "type": "Vegetarian",
            "description": "Dumplings. Rice flour, jaggery, coconut"
          }, {
            "id": 14,
            "name": "Masala Dosa",
            "image": "Masala_Dosa_with_Aloo_masala.jpg",
            "cost": 483,
            "type": "Vegetarian",
            "description": "Dosa with masala and potato."
          }, {
            "id": 15,
            "name": "Olan (dish)",
            "image": "Olan.jpg",
            "cost": 271,
            "type": "Vegetarian",
            "description": "Light and subtle-flavored Kerala dish prepared from white gourd, ash-gourd or black-eyed peas, coconut milk and ginger seasoned with coconut oil."
          }, {
            "id": 16,
            "name": "Parotta",
            "image": "Parotta.jpg",
            "cost": 434,
            "type": "Vegetarian",
            "description": "Layered kerala parotta made with maida and dalda."
          }, {
            "id": 17,
            "name": "Payasam",
            "image": "Kheer.jpg",
            "cost": 234,
            "type": "Vegetarian",
            "description": "Rice dessert. Rice, milk."
          }, {
            "id": 18,
            "name": "Pongal",
            "image": "Pongali.JPG",
            "cost": 455,
            "type": "Vegetarian",
            "description": "Pulao"
          }, {
            "id": 19,
            "name": "Puttu",
            "image": "Puttu.jpg",
            "cost": 437,
            "type": "",
            "description": "Ground rice"
          }, {
            "id": 20,
            "name": "Kanji",
            "image": "Chinese_rice_congee.jpg",
            "cost": 279,
            "type": "Vegetarian",
            "description": "Rice porridge"
          }, {
            "id": 21,
            "name": "Sambar",
            "image": "Sambaar_kadamba.jpg",
            "cost": 102,
            "type": "Vegetarian",
            "description": "Lentil soup cooked with vegetables and a blend of south Indian spices (masala). Usually taken with rice, idli, dosa, pongal or upma."
          }, {
            "id": 22,
            "name": "Sevai",
            "image": "Sevai_plain320.jpg",
            "cost": 391,
            "type": "",
            "description": "Kind of rice vermicelli used for breakfast"
          }, {
            "id": 23,
            "name": "Thayir sadam, mosaranna",
            "image": "Curd_rice_and_hummus.jpg",
            "cost": 262,
            "type": "",
            "description": "Curd rice"
          }, {
            "id": 24,
            "name": "Uttapam",
            "image": "Indian_Pancake.jpg",
            "cost": 370,
            "type": "Vegetarian",
            "description": "Rice pancake / hopper with a topping of onions / tomatoes / coconut"
          }, {
            "id": 25,
            "name": "Vada",
            "image": "Vada_2.jpg",
            "cost": 402,
            "type": "Vegetarian",
            "description": "Savory donut. Urad dal."
          }, {
            "id": 26,
            "name": "Wheat upma",
            "image": "Upma.jpg",
            "cost": 493,
            "type": "Vegetarian",
            "description": "A breakfast dish and snack. Upma prepared from wheat dhalia rava."
          }, {
            "id": 27,
            "name": "Obbattu (holige, bobbattu, pooran-poli)",
            "image": "Obbattu.jpg",
            "cost": 465,
            "type": "Vegetarian",
            "description": "A stuffed (moong gram dal and jaggery or coconut poornam) paratha. Dish native to South and West India in the states of (Karnataka, Andhra Pradesh and Maharashtra"
          }, {
            "id": 28,
            "name": "Pesarattu",
            "image": "Pesarattu.jpg",
            "cost": 490,
            "type": "Vegetarian",
            "description": "Dosa (pancake or crepe) of Andhra Pradesh made from moong dal (lentils), grains and spice batter."
          }],
        "east": [
          {
            "id": 1,
            "name": "Malpua/Malpoa",
            "image": "Malapua.jpg",
            "cost": 105,
            "type": "Sweet",
            "description": "Sweet Snacks. Specially in Bengal."
          }, {
            "id": 2,
            "name": "Momo",
            "image": "Momo101.jpg",
            "cost": 280,
            "type": "",
            "description": "Originally from Tibet, it is a popular snack/ food item in India."
          }, {
            "id": 3,
            "name": "Black rice",
            "image": "Black_rice_01.JPG",
            "cost": 356,
            "type": "",
            "description": "Special local variety of rice"
          }, {
            "id": 4,
            "name": "Brown Rice",
            "image": "Brun_ris.jpg",
            "cost": 451,
            "type": "",
            "description": "Special local variety of rice."
          }, {
            "id": 5,
            "name": "Chhenagaja",
            "image": "Chena_gaja_Odia_cuisine.jpg",
            "cost": 438,
            "type": "",
            "description": "Odia Dessert. Cottage cheese, flour, sugar syrup."
          }, {
            "id": 6,
            "name": "Chhenapoda",
            "image": "Chennapoda.jpg",
            "cost": 178,
            "type": "",
            "description": "Dessert. Cottage cheese, flour, sugar syrup. Oriya Specialty."
          }, {
            "id": 7,
            "name": "Chingri malai curry",
            "image": "Chingri_Malai_Curry.jpg",
            "cost": 496,
            "type": "",
            "description": "Curry. Prawn, coconut, mustard, steamed. Traditional Bengali Dish."
          }, {
            "id": 8,
            "name": "Dal",
            "image": "Dal_Makhani.jpg",
            "cost": 293,
            "type": "",
            "description": "Lentils."
          }, {
            "id": 9,
            "name": "Ilish or Chingri Bhape",
            "image": "Ilish.JPG",
            "cost": 164,
            "type": "",
            "description": "Curry. Ilish (Hilsha fish) or prawn, coconut, mustard, steamed. Traditional Bengali Dish."
          }, {
            "id": 10,
            "name": "Machher Jhol",
            "image": "MACHHA_HALADI.jpg",
            "cost": 482,
            "type": "",
            "description": "Curry. Fish, various spices."
          }, {
            "id": 11,
            "name": "Mishti Doi",
            "image": "Mishti_Doi.jpg",
            "cost": 493,
            "type": "",
            "description": "Dessert. Curd, sugar syrup and /or jaggery. Bengali Sweet curd."
          }, {
            "id": 12,
            "name": "Pakhala",
            "image": "Pakhala.jpg",
            "cost": 437,
            "type": "",
            "description": "Rice. Fermented rice, yoghurt, salt, seasonings."
          }, {
            "id": 13,
            "name": "Bhaji",
            "image": "Chilli_Bites_(Bhaji).jpg",
            "cost": 494,
            "type": "",
            "description": "Fried Vegetables."
          }, {
            "id": 14,
            "name": "Pantua",
            "image": "Pantua.JPG",
            "cost": 304,
            "type": "",
            "description": "Assamese sweet similar to Gulab Jamun"
          }, {
            "id": 15,
            "name": "Peda",
            "image": "Dharwad_peda.jpg",
            "cost": 320,
            "type": "",
            "description": "Sweet"
          }, {
            "id": 16,
            "name": "Rice",
            "image": "White,_Brown,_Red_&_Wild_rice.jpg",
            "cost": 205,
            "type": "",
            "description": "Staple Food."
          }, {
            "id": 17,
            "name": "Rosgulla",
            "image": "Rasagolla.JPG",
            "cost": 420,
            "type": "",
            "description": "Dessert. Cottage cheese, flour and sugar syrup. Signature Bengali condiment, originating in odisha"
          }, {
            "id": 18,
            "name": "Sabzi (curry)",
            "image": "Indiandishes.jpg",
            "cost": 230,
            "type": "",
            "description": "Different green or other vegetables."
          }, {
            "id": 19,
            "name": "Shondesh",
            "image": "Sondeshnolen.jpg",
            "cost": 138,
            "type": "",
            "description": "Dessert. Milk, sugar. Signature Bengali Dish"
          }]
      }
      ;



    this.changeRegion('north');
  }

  changeRegion(region: any) {
    this.selectRegion = this.food[region];
    this.selectRegion.sort((first: any, second: any) => { return first.description.length - second.description.length; });
  }

  confirmViewOption(id, name, type, cost) {

    const dialogRef = this.dialog.open(
      ConfirmModalComponent,
      {
        height: '250px',
        data: {
          title: `Food :  ${name}`, confirmMessage: `Would  you like to have : ${name}`, from: 'FoodComponent'
          , cost: cost
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        // this.openVideoModal()
        console.log('The dialog was closed' + result);
        this.dbService.addServiceIntoBillingModal(id, `'event'`, name, cost)
          .then(response => {
            console.log(response);

            // this.openVideoModal(id, title, releaseDate, videoList);
          });
      } else {
        console.log('The dialog was closed');

      }
    });
  }

}
