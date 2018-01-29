using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Game : MonoBehaviour {

	static Game instance;
	public Text Game_Text;
	private bool Won = false;

	void Start() {
		instance = this;
	}

	public static void Begin() {
		instance.Game_Text.text = "";
	}

	public static void Lose() {
		if(!instance.Won)
			instance.Game_Text.text = "You Lose";
	}

	public static void Win() {
		instance.Won = true;
		instance.Game_Text.text = "You Win!";
	}
}
