using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ball : MonoBehaviour {

	public float initVelocity = 1f;

	private Rigidbody body;

	private bool inPlay;

	void Awake() {
		body = GetComponent<Rigidbody> ();
	}

	void Update() {
		if (Input.GetButtonDown ("Fire1") && !inPlay) {
			transform.parent = null;
			inPlay = true;
			body.isKinematic = false;
			body.AddForce (new Vector3 (initVelocity, initVelocity, 0));
			Game.Begin ();
		}
	}
}