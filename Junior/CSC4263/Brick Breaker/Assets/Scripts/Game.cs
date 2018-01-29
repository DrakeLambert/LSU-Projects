using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Game : MonoBehaviour {

	static Game instance;
	public Text Game_Text;
	private bool Won = false;
	private bool Lost = false;

	void Start() {
		instance = this;
	}

	void Update() {
		if ((Lost || Won) && Input.GetButtonDown ("Fire1")) {
			Brick.count = 20;
			Application.LoadLevel (Application.loadedLevel);
		}
	}

	public static void Begin() {
		instance.Game_Text.text = "";
	}

	public static void Lose() {
		if(!instance.Won)
			instance.Game_Text.text = "You Lose";
		instance.Lost = true;
	}

	public static void Win() {
		instance.Won = true;
		instance.Game_Text.text = "You Win!";
	}
}
